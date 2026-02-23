#!/usr/bin/env sh
set -e
cd "$(dirname "$0")/.."

git add -A

if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

msg="${1:-chore: update openclaw setup}"
git -c user.name="openclaw-bot" -c user.email="openclaw@local" commit -m "$msg"
git push
