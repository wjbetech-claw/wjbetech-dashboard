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
  # Prefer reality: your container repo root is /workspace
  local candidates=(
    "/workspace"
    "/workspace/apps/wjbetech-dashboard"
    "/workspace/wjbetech-dashboard"
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

# Run the agent inside the container, on the CURRENT branch (created by supervisor)
docker exec -i "$CONTAINER_NAME" sh -lc "
  set -e
  cd '$REPO_PATH'

  echo '[RUNNER] pwd:' \$(pwd)
  git status --porcelain=v1 --branch || true

  branch=\$(git rev-parse --abbrev-ref HEAD)
  echo '[RUNNER] branch:' \$branch
  if [ \"\$branch\" = \"main\" ]; then
    echo 'BLOCKED: runner is on main; supervisor should create a task branch first'
    exit 1
  fi

  # Write prompt to a file to avoid nested-quote hell
  cat > /tmp/openclaw_task.txt <<'EOF'
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
EOF

  printf '\nTask:\n%s\n' \"${task}\" >> /tmp/openclaw_task.txt

  # Run the agent and capture output so we can detect BLOCKED:
  out=\$(openclaw agent --agent dashboard --message \"\$(cat /tmp/openclaw_task.txt)\" --timeout 3600 --json 2>&1) || {
    echo \"\$out\"
    exit 1
  }

  echo \"\$out\"
  echo \"\$out\" | grep -q 'BLOCKED:' && exit 1
"
