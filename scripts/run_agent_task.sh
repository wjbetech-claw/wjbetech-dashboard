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
REPO_PATH="/workspace/apps/wjbetech-dashboard"
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

  # TODO: REPLACE this with the actual OpenClaw command you use to run a task.
  # Examples you might end up using:
  #   openclaw run --task \"$task\"
  #   node scripts/openclaw.js --task \"$task\"
  #   ./scripts/openclaw-task.sh \"$task\"
  #
  # For now, fail loudly so you don’t think it worked when it didn’t:
  echo '[RUNNER] ERROR: OpenClaw task command not wired yet.'
  echo '[RUNNER] Task was: $task'
  exit 1
"