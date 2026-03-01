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

  echo '[RUNNER] context: top-level listing'
  ls -la

  echo '[RUNNER] context: TODO.md (first 200 lines)'
  sed -n '1,200p' TODO.md || true

  echo '[RUNNER] context: backend listing'
  ls -la backend || true

  echo '[RUNNER] context: src listing'
  ls -la src || true

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

  printf '\nTask:\n%s\n' \"${task}\" >> /tmp/openclaw_task.txt

  out=\$(openclaw agent --agent dashboard --message \"\$(cat /tmp/openclaw_task.txt)\" --timeout 3600 --json 2>&1) || {
    echo \"\$out\"
    exit 1
  }

  echo \"\$out\"

  echo \"\$out\" | grep -q 'BLOCKED:' && exit 1
"

# --- SYNC CHANGES FROM CONTAINER -> HOST ---
echo "[RUNNER] syncing changes from container to host..."

# Collect changed + untracked files inside container
changed_files="$(
  docker exec -i "$CONTAINER_NAME" sh -lc "
    set -e
    cd '$REPO_PATH'
    (git diff --name-only; git ls-files -o --exclude-standard) | sed '/^\s*$/d' | sort -u
  "
)"

if [[ -z "$changed_files" ]]; then
  echo "[RUNNER] no changed files found inside container to sync"
  exit 1
fi

echo "[RUNNER] files to sync:"
echo "$changed_files" | sed 's/^/  - /'

# Copy each file out of the container into the host repo root
while IFS= read -r f; do
  [[ -z "$f" ]] && continue

  # ensure parent dir exists on host
  mkdir -p "$(dirname "$f")"

  # copy the file from container -> host
  docker cp "${CONTAINER_NAME}:${REPO_PATH}/${f}" "./${f}"
done <<< "$changed_files"

echo "[RUNNER] sync complete. Host git status:"
git status --porcelain=v1 --branch || true
# ------------------------------------------
