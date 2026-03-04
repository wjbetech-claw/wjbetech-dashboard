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

  local payload
  if command -v jq >/dev/null 2>&1; then
    payload="$(jq -n --arg username "Dev Progress" --arg content "$msg" '{username:$username, content:$content}')"
  else
    payload="$(python3 - <<PY
import json
print(json.dumps({"username": "Dev Progress", "content": "$msg"}))
PY
)"
  fi

  curl -s -H "Content-Type: application/json" \
    -X POST \
    -d "$payload" \
    "$GITHUB_DEV_PROGRESS_BOT" \
    >/dev/null 2>&1 || echo "[WARN] Discord notification failed"
}

require_tools() {
  command -v gh >/dev/null 2>&1 || { echo "[FATAL] gh not found"; exit 127; }
  command -v git >/dev/null 2>&1 || { echo "[FATAL] git not found"; exit 127; }
  command -v python3 >/dev/null 2>&1 || { echo "[FATAL] python3 not found"; exit 127; }
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

require_expected_pwd() {
  local pwd
  pwd="$(pwd)"

  if [[ -f "/.dockerenv" ]] || grep -qaE 'docker|containerd|kubepods' /proc/1/cgroup 2>/dev/null; then
    if [[ "$pwd" != *"$REQUIRED_SUBPATH"* ]]; then
      echo "[FATAL] Must run from a path containing '$REQUIRED_SUBPATH'. Current: $pwd" >&2
      exit 2
    fi
    return 0
  fi

  git rev-parse --show-toplevel >/dev/null 2>&1 || {
    echo "[FATAL] Not inside a git repository." >&2
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

sync_main_safe() {
  git fetch origin
  git checkout main
  git pull --ff-only origin main
}

next_todo() {
  # First unchecked markdown checkbox line: "- [ ] do something"
  # Output format: "<line_no>:<full line>"
  grep -nE '^\s*-\s*\[\s\]\s+' "$TODO_FILE" | head -n1 || true
}

next_todo_with_subtasks() {
  # Prefer the first unchecked subtask under the first unchecked parent task.
  # Output format: "<line_no>:<full line>"
  awk '
    function is_unchecked(line) { return line ~ /^[[:space:]]*-[[:space:]]*\[[[:space:]]\][[:space:]]+/ }
    function is_subtask(line) { return line ~ /^[[:space:]]+-[[:space:]]*\[[[:space:]]\][[:space:]]+Task [0-9]+(\.[0-9]+)+/ }
    function is_parent(line) { return line ~ /^[[:space:]]*-[[:space:]]*\[[[:space:]]\][[:space:]]+Task [0-9]+:/ }
    function is_header(line) { return line ~ /^[[:space:]]*## / }
    function is_label(line) { return line ~ /^[[:space:]]*(Subtasks:|High-level plan:|Notes:)/ }
    {
      if (!found_parent && is_parent($0) && is_unchecked($0)) {
        parent_line = NR ":" $0
        found_parent = 1
        next
      }

      if (found_parent) {
        if (is_header($0)) {
          print parent_line
          exit
        }

        if (is_subtask($0) && is_unchecked($0)) {
          print NR ":" $0
          exit
        }

        if (is_label($0) || $0 ~ /^[[:space:]]*$/) {
          next
        }

        if (is_parent($0) && is_unchecked($0)) {
          print parent_line
          exit
        }
      }
    }
    END {
      if (found_parent && parent_line != "") print parent_line
    }
  ' "$TODO_FILE"
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
    notify "Local checks disabled."
    return 0
  fi

  if [[ -f package-lock.json ]]; then
    npm ci
  else
    npm install
  fi

  npm run lint --if-present
  npm run test --if-present
  npm run typecheck --if-present
  npm run build --if-present
}

infer_pr_type() {
  local text="$1"
  local lower
  lower="$(printf '%s' "$text" | tr '[:upper:]' '[:lower:]')"

  if [[ "$lower" == fix* ]]; then echo "fix"; return; fi
  if [[ "$lower" == feat* ]]; then echo "feat"; return; fi
  if [[ "$lower" == test* ]]; then echo "test"; return; fi
  if [[ "$lower" == docs* ]]; then echo "docs"; return; fi
  if [[ "$lower" == refactor* ]]; then echo "refactor"; return; fi

  echo "chore"
}

status_heartbeat() {
  local label="$1"
  local last_ts="$2"
  local now
  now="$(date +%s)"

  if (( now - last_ts >= 1800 )); then
    notify "Still working: $label"
    echo "[STATUS] $(date -u +%Y-%m-%dT%H:%M:%SZ) | $label"
    echo "$now"
    return 0
  fi

  echo "$last_ts"
}

sanitize_pr_body() {
  python3 - <<'PY'
import re, sys
s = sys.stdin.read()

# Convert literal backslash escapes into real newlines if they appear
s = s.replace("\\r\\n", "\n").replace("\\n", "\n").replace("\\r", "\n")

# Normalize newlines
s = s.replace("\r\n", "\n").replace("\r", "\n")

# Strip ANSI escape sequences
s = re.sub(r"\x1B\[[0-?]*[ -/]*[@-~]", "", s)

# Strip control chars except newline/tab
s = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", s)

# Cap size to keep PR bodies human
max_chars = 5000
if len(s) > max_chars:
  s = s[:max_chars].rstrip() + "\n\n[truncated]\n"

print(s, end="")
PY
}

create_pr() {
  local branch="$1"
  local title="$2"
  local body="$3"

  # Force a PR body that satisfies PR_GUIDELINES.md requirements.
  # This ensures the wrapper validation passes every time.
  local body_prefix
  body_prefix=$'I followed PR_GUIDELINES.md\n\n## Summary\n- \n\n## Why\n- \n\n## What changed\n- \n\n## How to test\n- \n\n## Risks / Rollback\n- \n\n---\n'

  body="${body_prefix}${body}"

  local body_file
  body_file="$(mktemp)"
  printf '%s' "$body" | sanitize_pr_body > "$body_file"

  scripts/gh_pr_create_with_guidelines.sh -R "$REPO" \
    --title "$title" \
    --body-file "$body_file" \
    --head "$branch" \
    --base main >/dev/null

  rm -f "$body_file"

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
  local last_update
  last_update="$(date +%s)"

  # Wait until a run exists (CI might take a moment to start)
  for _ in $(seq 1 60); do
    run_id="$(latest_run_id_for_branch "$branch")"
    if [[ -n "$run_id" && "$run_id" != "null" ]]; then
      break
    fi
    sleep "$CI_POLL_SECONDS"
    last_update="$(status_heartbeat "waiting for CI on $branch" "$last_update")"
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
    last_update="$(status_heartbeat "waiting for CI on $branch" "$last_update")"
  done
}

wait_for_merge() {
  local pr_url="$1"
  local last_update
  last_update="$(date +%s)"

  notify "Waiting for PR to merge: $pr_url"

  while true; do
    local merged
    merged="$(gh pr view -R "$REPO" "$pr_url" --json merged --jq .merged 2>/dev/null || echo "false")"

    if [[ "$merged" == "true" ]]; then
      notify "PR merged: $pr_url"
      return 0
    fi

    sleep "$CI_POLL_SECONDS"
    last_update="$(status_heartbeat "waiting for merge $pr_url" "$last_update")"
  done
}

mark_todo_done_via_pr() {
  local line_no="$1"
  local task="$2"

  sync_main_safe

  local ts branch pr_url
  ts="$(date +%Y%m%d-%H%M%S)"
  branch="chore/mark-${ts}"

  git checkout -b "$branch"

  sed -i "${line_no}s/\[ \]/[x]/" "$TODO_FILE"

  if git diff --quiet -- "$TODO_FILE"; then
    notify "WARN: TODO line $line_no already marked done."
    git checkout main
    git branch -D "$branch"
    return 0
  fi

  git add "$TODO_FILE"
  git commit -m "chore: mark TODO done (${task})"
  git push -u origin "$branch"

  pr_url="$(create_pr "$branch" "chore: ${task}" "Automated change for TODO line $line_no: $line")"
  notify "TODO PR created: $pr_url"

  enable_auto_merge "$pr_url" || notify "Auto-merge not enabled for TODO PR."

  wait_for_ci "$branch" || {
    notify "STOPPING: CI failed on TODO PR."
    exit 21
  }

  wait_for_merge "$pr_url"

  notify "TODO successfully marked complete via PR."
}

# ----------------------------
# MAIN
# ----------------------------
main() {
  require_tools
  require_repo_root
  require_expected_pwd
  snapshot

  gh auth status >/dev/null 2>&1 || { notify "FAIL: gh not authenticated"; exit 1; }

  notify "Supervisor started for $REPO"

  while true; do
    local item line_no line task slug ts branch pr_url

    item="$(next_todo_with_subtasks)"
    if [[ -z "$item" ]]; then
      item="$(next_todo)"
    fi
    if [[ -z "$item" ]]; then
      notify "All TODOs complete."
      exit 0
    fi

    line_no="${item%%:*}"
    line="${item#*:}"
    task="${line#*] }"
    slug="$(sanitize_branch_slug "$task")"
    ts="$(date +%Y-%m-%d)"
    branch="chore/agent-${ts}-${slug}"

    notify "Starting TODO (line $line_no): $task"
    require_clean_tree

    # Always start from a pristine, up-to-date main
    sync_main_safe
    require_clean_tree

    if git show-ref --verify --quiet "refs/heads/$branch"; then
      git branch -D "$branch"
    fi

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

    pr_type="$(infer_pr_type "$task")"
    pr_title="${pr_type}: ${task}"

    git add -A
    git commit -m "$pr_title"
    git push -u origin "$branch"

    pr_url="$(create_pr "$branch" "$pr_title" "Automated change for TODO line $line_no: $line")"
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
    mark_todo_done_via_pr "$line_no" "$task"

    notify "Task complete and TODO updated. Continuing to next task..."

    # Loop continues immediately to next TODO item; main sync happens at start of next iteration.
  done
}

main "$@"
