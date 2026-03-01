#!/usr/bin/env bash
set -euo pipefail

REPO="wjbetech-claw/wjbetech-dashboard"
BRANCH_PREFIX="auto"
TODO_FILE="TODO.md"

notify() {
  # Replace this with your real notification channel (see section 4)
  echo "[NOTIFY] $*"
}

require_tools() {
  command -v gh >/dev/null
  command -v git >/dev/null
}

next_todo() {
  # Example: first unchecked markdown checkbox line
  # "- [ ] do something"
  grep -nE '^\s*-\s*\[\s\]\s+' "$TODO_FILE" | head -n1 || true
}

mark_done() {
  local line_no="$1"
  # flip "- [ ]" to "- [x]" on that line
  sed -i "${line_no}s/\[ \]/[x]/" "$TODO_FILE"
}

main() {
  require_tools
  gh auth status >/dev/null || { notify "FAIL: gh not authenticated"; exit 1; }

  notify "Supervisor started for $REPO"

  while true; do
    item="$(next_todo)"
    if [[ -z "$item" ]]; then
      notify "All TODOs complete."
      exit 0
    fi

    line_no="${item%%:*}"
    task="${item#*:}"
    task="${task#*] }"

    ts="$(date +%Y%m%d-%H%M%S)"
    branch="${BRANCH_PREFIX}/${ts}"

    notify "Starting: ${task}"

    # Ensure clean working tree
    git status --porcelain | grep -q . && { notify "FAIL: dirty working tree"; exit 1; }

    git checkout main
    git pull --rebase
    git checkout -b "$branch"

    # >>> This is where you invoke OpenClaw / your agent runner <<<
    # Example placeholder:
    # openclaw run --task "$task"
    #
    # You MUST make this command return non-zero on failure.
    #
    # For now:
    ./scripts/run_agent_task.sh "$task"

    # If agent made no changes, bail (otherwise you get empty PRs)
    if git diff --quiet && git diff --cached --quiet; then
      notify "FAIL: no changes produced for task: ${task}"
      git checkout main
      git branch -D "$branch"
      continue
    fi

    git add -A
    git commit -m "chore: ${task}"
    git push -u origin "$branch"

    pr_url="$(gh pr create -R "$REPO" \
      --title "$task" \
      --body "Automated change for: $task" \
      --head "$branch" \
      --base main \
      --json url \
      --jq .url)"

    notify "PR created: $pr_url"

    # Optional: enable auto-merge (requires repo settings + permissions)
    gh pr merge -R "$REPO" --auto --merge "$pr_url" || notify "Auto-merge not enabled (needs checks/settings)."

    # Mark TODO done locally and push that too (optional)
    mark_done "$line_no"
    git add "$TODO_FILE"
    git commit -m "chore: mark todo done"
    git push

    notify "Completed: ${task} (PR: $pr_url)"
  done
}

main "$@"
