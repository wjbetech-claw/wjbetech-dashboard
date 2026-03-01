#!/usr/bin/env bash
set -euo pipefail

# ----------------------------
# CONFIG
# ----------------------------
REPO="wjbetech-claw/wjbetech-dashboard"
TODO_FILE="TODO.md"

# MUST be run from the app root (host or container), matching your workflow doc.
# Host: /home/will/openclaw/apps/wjbetech-dashboard
# Container: /workspace
REQUIRED_SUBPATH="/workspace"

BRANCH_PREFIX="auto"

# Local gates: set to 0 if you want CI-only gating (not recommended).
RUN_LOCAL_CHECKS=1

# How long to wait between CI polls (seconds)
CI_POLL_SECONDS=20

# ----------------------------
# HELPERS
# ----------------------------

# Load .env if present
if [[ -f .env ]]; then
  set -a
  source .env
  set +a
fi

notify() {
  local msg="$1"
  echo "[NOTIFY] $msg"

  [[ -n "${GITHUB_DEV_PROGRESS_BOT:-}" ]] || { echo "[WARN] GITHUB_DEV_PROGRESS_BOT not set"; return 0; }

  curl -s -H "Content-Type: application/json" \
    -X POST \
    -d "$(jq -n --arg username "Dev Progress" --arg content "$msg" '{username:$username, content:$content}')" \
    "$GITHUB_DEV_PROGRESS_BOT" \
    >/dev/null 2>&1 || echo "[WARN] Discord notification failed"
}

require_tools() {
  command -v gh >/dev/null 2>&1 || { echo "[FATAL] gh not found"; exit 127; }
  command -v git >/dev/null 2>&1 || { echo "[FATAL] git not found"; exit 127; }
}

snapshot() {
  echo "[STATE] pwd=$(pwd)"
  git status --porcelain=v1 --branch || true
  git remote -v || true
}

require_repo_root() {
  git rev-parse --show-toplevel >/dev/null 2>&1 || {
    echo "[FATAL] Not inside a git repository."
    exit 2
  }

  [[ -f "$TODO_FILE" ]] || {
    echo "[FATAL] $TODO_FILE not found in repo root."
    exit 2
  }
}

require_clean_tree() {
  if git status --porcelain | grep -q .; then
    echo "[FATAL] Working tree is dirty. Refusing to continue."
    git status --porcelain=v1 --branch
    exit 3
  fi
}

sync_main_hard() {
  # Make local main match origin/main exactly.
  git fetch origin
  git checkout main
  git reset --hard origin/main
}

next_todo() {
  # First unchecked markdown checkbox line: "- [ ] do something"
  # Output format: "<line_no>:<full line>"
  grep -nE '^\s*-\s*\[\s\]\s+' "$TODO_FILE" | head -n1 || true
}

sanitize_branch_slug() {
  # Turn task text into a safe slug: lowercase, alnum+dash, max 40 chars
  # shellcheck disable=SC2001
  echo "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g' \
    | cut -c1-40
}

run_local_checks() {
  if [[ "$RUN_LOCAL_CHECKS" -ne 1 ]]; then
    notify "Local checks disabled (RUN_LOCAL_CHECKS=0)."
    return 0
  fi

  if [[ -f package-lock.json ]]; then
    npm ci
  else
    npm install
  fi

  npm run lint
  npm run typecheck
  npm test
}

create_pr() {
  local branch="$1"
  local title="$2"
  local body="$3"

  # Create PR (works across gh versions). Prints URL via pr view after creation.
  gh pr create -R "$REPO" \
    --title "$title" \
    --body "$body" \
    --head "$branch" \
    --base main >/dev/null

  gh pr view -R "$REPO" --json url --jq .url
}

enable_auto_merge() {
  local pr_url="$1"
  gh pr merge -R "$REPO" --auto --merge "$pr_url" >/dev/null 2>&1 || return 1
}

latest_run_id_for_branch() {
  local branch="$1"
  # Grab latest run id for this branch
  gh run list -R "$REPO" --branch "$branch" --limit 1 --json databaseId --jq '.[0].databaseId' 2>/dev/null || true
}

wait_for_ci() {
  local branch="$1"
  local run_id=""
  local status=""
  local conclusion=""

  # Wait until a run exists (CI might take a moment to start)
  for _ in $(seq 1 60); do
    run_id="$(latest_run_id_for_branch "$branch")"
    if [[ -n "$run_id" && "$run_id" != "null" ]]; then
      break
    fi
    sleep "$CI_POLL_SECONDS"
  done

  if [[ -z "$run_id" || "$run_id" == "null" ]]; then
    notify "WARN: No CI run detected for branch '$branch' after waiting. Check Actions/required checks config."
    return 0
  fi

  notify "CI run detected: $run_id (branch: $branch)"

  while true; do
    status="$(gh run view -R "$REPO" "$run_id" --json status --jq .status)"
    conclusion="$(gh run view -R "$REPO" "$run_id" --json conclusion --jq .conclusion)"

    echo "[CI] run=$run_id status=$status conclusion=$conclusion"

    if [[ "$status" == "completed" ]]; then
      if [[ "$conclusion" == "success" ]]; then
        notify "CI SUCCESS for branch '$branch' (run $run_id)."
        return 0
      fi

      notify "CI FAILED for branch '$branch' (run $run_id). Showing logs:"
      gh run view -R "$REPO" "$run_id" --log || true
      return 10
    fi

    sleep "$CI_POLL_SECONDS"
  done
}

wait_for_merge() {
  local pr_url="$1"

  notify "Waiting for PR to merge: $pr_url"

  while true; do
    local merged
    merged="$(gh pr view -R "$REPO" "$pr_url" --json merged --jq .merged 2>/dev/null || echo "false")"

    if [[ "$merged" == "true" ]]; then
      notify "PR merged: $pr_url"
      return 0
    fi

    sleep "$CI_POLL_SECONDS"
  done
}

mark_todo_done_and_push_main() {
  local line_no="$1"
  local task="$2"

  # Update main then edit TODO.md ON MAIN
  sync_main_hard

  # Flip checkbox
  sed -i "${line_no}s/\[ \]/[x]/" "$TODO_FILE"

  # Only commit if it actually changed the file
  if git diff --quiet -- "$TODO_FILE"; then
    notify "WARN: TODO line $line_no was already marked done (no change)."
    return 0
  fi

  git add "$TODO_FILE"
  git commit -m "chore: mark TODO done (${task})"
  git push origin main

  notify "Marked TODO done on main (line $line_no): $task"
}

# ----------------------------
# MAIN
# ----------------------------
main() {
  require_tools
  require_repo_root
  snapshot

  gh auth status >/dev/null 2>&1 || { notify "FAIL: gh not authenticated"; exit 1; }

  notify "Supervisor started for $REPO"

  while true; do
    local item line_no line task slug ts branch pr_url

    item="$(next_todo)"
    if [[ -z "$item" ]]; then
      notify "All TODOs complete."
      exit 0
    fi

    line_no="${item%%:*}"
    line="${item#*:}"
    task="${line#*] }"
    slug="$(sanitize_branch_slug "$task")"
    ts="$(date +%Y%m%d-%H%M%S)"
    branch="${BRANCH_PREFIX}/${ts}-${slug}"

    notify "Starting TODO (line $line_no): $task"
    require_clean_tree

    # Always start from a pristine, up-to-date main
    sync_main_hard
    require_clean_tree

    git checkout -b "$branch"

    # Invoke the agent runner (must be non-interactive / non-zero on failure)
    ./scripts/run_agent_task.sh "$task"

    # Ensure work was produced
    if git diff --quiet && git diff --cached --quiet; then
      notify "FAIL: no changes produced for task: $task"
      git checkout main
      git branch -D "$branch"
      continue
    fi

    # Local gates before commit/PR
    run_local_checks

    git add -A
    git commit -m "chore: ${task}"
    git push -u origin "$branch"

    pr_url="$(create_pr "$branch" "$task" "Automated change for TODO line $line_no: $line")"
    notify "PR created: $pr_url"

    if enable_auto_merge "$pr_url"; then
      notify "Auto-merge enabled for: $pr_url"
    else
      notify "Auto-merge NOT enabled (repo settings/permissions/checks may block it): $pr_url"
    fi

    # Monitor CI. If it fails, STOP and report (no fake autonomy).
    if ! wait_for_ci "$branch"; then
      notify "STOPPING: CI failed for $pr_url. Fix required."
      exit 20
    fi

    notify "CI green for $pr_url. Waiting for merge..."

    wait_for_merge "$pr_url"

    # After merge, mark the TODO as done on main and continue loop
    mark_todo_done_and_push_main "$line_no" "$task"

    notify "Task complete and TODO updated. Continuing to next task..."

    # Loop continues immediately to next TODO item; main sync happens at start of next iteration.
  done
}

main "$@"
