#!/usr/bin/env bash
umask 022
set -euo pipefail

task="${1:-}"
if [[ -z "$task" ]]; then
  echo "Usage: $0 <task>"
  exit 2
fi

echo "[RUNNER] task: $task"

# --- CONFIG ---
CONTAINER_NAME="${CONTAINER_NAME:-openclaw-openclaw-gateway-1}"
# --------------

# If we're already running inside the gateway container, we must NOT require docker.
# In-container mode should run directly from /workspace.
IN_CONTAINER=0
if [[ -f "/.dockerenv" ]] || grep -qaE 'docker|containerd|kubepods' /proc/1/cgroup 2>/dev/null; then
  IN_CONTAINER=1
fi

sanitize_output() {
  python3 - <<'PY'
import re
import sys

s = sys.stdin.read()
s = s.replace("\r\n", "\n").replace("\r", "\n")
s = re.sub(r"\x1B\[[0-?]*[ -/]*[@-~]", "", s)
s = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", s)
sys.stdout.write(s)
PY
}

run_agent_in_repo() {
  local repo_path="$1"
  echo "[RUNNER] repo_path=$repo_path"

  cd "$repo_path"

  echo "[RUNNER] pwd: $(pwd)"
  git status --porcelain=v1 --branch || true

  local branch
  branch="$(git rev-parse --abbrev-ref HEAD)"
  echo "[RUNNER] branch: $branch"
  if [[ "$branch" == "main" ]]; then
    echo "BLOCKED: runner is on main; supervisor should create a task branch first"
    exit 1
  fi

  cat > /tmp/openclaw_task.txt <<'EOF_INNER'
You are a non-interactive coding worker operating inside a git repo. Your only job is to edit files to implement the task.

Absolute rules:
- Do NOT ask questions.
- Do NOT request permission.
- Do NOT talk about PRs/branches/merging.
- Do NOT output plans or next steps. Only do the work and report what changed.
- Do NOT stop just because the repo is clean. A clean repo means you must create changes.

Required workflow (must follow in order):
1) Read the task requirements from TODO.md and/or WORKFLOW_AUTO.md as needed.
2) Inspect the current repo structure to decide where the change belongs.
3) Implement the task by creating/modifying files.
4) When finished, print:
   - CHANGED_FILES: <one per line>
   - A 3-8 line summary of what you implemented.

Hard success criteria:
- After edits, `git status --porcelain=v1` MUST show changes.

Failure criteria (use only for real blockers):
- If you cannot proceed due to missing permissions, missing tools, missing directories, or unclear repo structure that prevents implementation,
  output exactly ONE line:
  BLOCKED: <reason>
  and exit non-zero.
EOF_INNER

  printf '\nTask:\n%s\n' "$task" >> /tmp/openclaw_task.txt

  # Protect supervisor scripts from the agent
  chmod -w scripts/run_agent_task.sh scripts/autonomous.sh WORKFLOW_AUTO.md 2>/dev/null || true

  local log_file
  log_file="/tmp/openclaw_agent_last.log"
  rm -f "$log_file"

  out="$(NO_COLOR=1 CLICOLOR=0 CLICOLOR_FORCE=0 FORCE_COLOR=0 TERM=dumb \
    openclaw agent --agent dashboard --message "$(cat /tmp/openclaw_task.txt)" --timeout 3600 --log-level debug --no-color 2>&1)" || {
    printf '%s' "$out" > "$log_file"
    echo "$out"
    echo "[RUNNER] agent output saved to $log_file"
    chmod +w scripts/run_agent_task.sh scripts/autonomous.sh WORKFLOW_AUTO.md 2>/dev/null || true
    exit 1
  }

  printf '%s' "$out" > "$log_file"

  clean_out="$(printf '%s' "$out" | sanitize_output)"

  if [[ -z "${clean_out//[[:space:]]/}" ]]; then
    echo "[RUNNER] agent produced no output; see $log_file"
    chmod +w scripts/run_agent_task.sh scripts/autonomous.sh WORKFLOW_AUTO.md 2>/dev/null || true
    exit 1
  fi

  if git diff --quiet && git diff --cached --quiet; then
    echo "[RUNNER] agent produced no file changes; see $log_file"
    chmod +w scripts/run_agent_task.sh scripts/autonomous.sh WORKFLOW_AUTO.md 2>/dev/null || true
    exit 1
  fi

  echo "$clean_out"

  chmod +w scripts/run_agent_task.sh scripts/autonomous.sh WORKFLOW_AUTO.md 2>/dev/null || true

  echo "$clean_out" | grep -q 'BLOCKED:' && exit 1
}

if [[ "$IN_CONTAINER" -eq 1 ]]; then
  run_agent_in_repo "/workspace"
  exit 0
fi

# Host mode requires docker.
command -v docker >/dev/null 2>&1 || { echo "[RUNNER] docker not found (host mode)"; exit 127; }

docker ps --format '{{.Names}}' | grep -qx "$CONTAINER_NAME" || {
  echo "[RUNNER] container not running or not found: $CONTAINER_NAME"
  docker ps --format '  - {{.Names}}'
  exit 1
}

# Run the same script inside the container (single source of truth)
docker exec -i "$CONTAINER_NAME" sh -lc "
  set -e
  cd /workspace
  ./scripts/run_agent_task.sh \"${task}\"
"
