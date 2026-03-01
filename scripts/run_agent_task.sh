#!/usr/bin/env bash
set -euo pipefail

task="${1:-}"
if [[ -z "$task" ]]; then
  echo "Usage: $0 <task>"
  exit 2
fi

echo "[RUNNER] task: $task"

# --- CONFIG ---
# Container name that has OpenClaw running (adjust if yours differs)
CONTAINER_NAME="openclaw-openclaw-gateway-1"

# Repo path INSIDE the container (adjust if your container mounts it somewhere else)
REPO_PATH="/workspace"
# --------------

# Sanity checks
command -v docker >/dev/null || { echo "[RUNNER] docker not found"; exit 1; }
docker ps --format '{{.Names}}' | grep -qx "$CONTAINER_NAME" || {
  echo "[RUNNER] container not running: $CONTAINER_NAME"
  exit 1
}

# Run ONE task through OpenClaw inside the container.
# IMPORTANT: This must return non-zero if the agent fails.
docker exec -i "$CONTAINER_NAME" sh -lc "
  set -e
  cd '$REPO_PATH'
  echo '[RUNNER] pwd:' \$(pwd)
  git status --porcelain || true

  # Pull latest main so the agent uses newest scripts/config
  git checkout main
  git pull --ff-only

  # Run one OpenClaw agent turn via the gateway (inside container)
  openclaw agent --agent dashboard --message "You are acting as an autonomous coding agent working in this git repo. Do NOT ask questions. Implement the task by editing/creating files in the workspace so that 'git status --porcelain' shows changes. After changes are made, output a short summary of what you changed. Task: $task" --timeout 3600 --json
"
