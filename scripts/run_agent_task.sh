#!/usr/bin/env bash
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

command -v docker >/dev/null 2>&1 || { echo "[RUNNER] docker not found"; exit 127; }

docker ps --format '{{.Names}}' | grep -qx "$CONTAINER_NAME" || {
  echo "[RUNNER] container not running or not found: $CONTAINER_NAME"
  echo "[RUNNER] running containers:"
  docker ps --format '  - {{.Names}}'
  exit 1
}

detect_repo_path() {
  local candidates=(
    "/workspace/apps/wjbetech-dashboard"
    "/workspace/wjbetech-dashboard"
    "/workspace"
  )

  for p in "${candidates[@]}"; do
    if docker exec -i "$CONTAINER_NAME" sh -lc "[ -d '$p/.git' ]" >/dev/null 2>&1; then
      echo "$p"
      return 0
    fi
  done
  return 1
}

REPO_PATH="$(detect_repo_path)" || {
  echo "[RUNNER] Could not find repo inside container."
  echo "[RUNNER] Debug listing:"
  docker exec -i "$CONTAINER_NAME" sh -lc "ls -la /workspace; ls -la /workspace/apps || true" || true
  exit 1
}

echo "[RUNNER] container=$CONTAINER_NAME repo_path=$REPO_PATH"

docker exec -i "$CONTAINER_NAME" sh -lc "
  set -e
  cd '$REPO_PATH'

  echo '[RUNNER] pwd:' \$(pwd)
  git status --porcelain=v1 --branch || true

  # Keep container copy aligned (if it is a real git checkout)
  git checkout main
  git pull --ff-only

  openclaw agent --agent dashboard --message \"
You are a non-interactive coding worker operating inside a git repo.

Hard rules:
- Do NOT ask questions.
- Do NOT mention PRs, branches, or next steps.
- Do NOT request permission.
- Only edit files to implement the task.

Success criteria:
- After edits, 'git status --porcelain=v1' must show changes.

Failure criteria:
- If you cannot proceed, output exactly one line:
  BLOCKED: <reason>
and exit non-zero.

Task:
$task
\" --timeout 3600 --json
"
