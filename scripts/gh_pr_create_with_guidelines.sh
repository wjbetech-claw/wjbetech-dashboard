#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
GUIDE="$REPO_ROOT/PR_GUIDELINES.md"

if [[ ! -f "$GUIDE" ]]; then
  echo "ERROR: PR_GUIDELINES.md not found at: $GUIDE" >&2
  exit 2
fi

# Ensure guidelines are read every time this script runs.
PR_GUIDELINES_TEXT="$(cat "$GUIDE")"
export PR_GUIDELINES_TEXT

# Expected usage:
#   gh_pr_create_with_guidelines.sh -R owner/repo --title "..." --base main --body-file /path/to/body.md
# or:
#   gh_pr_create_with_guidelines.sh -R owner/repo --title "..." --base main --body "..."
#
# We enforce:
# - PR body must acknowledge guidelines
# - PR body must have required headings (tune to your PR_GUIDELINES.md)

ACK_RE='followed PR_GUIDELINES\.md'

# Parse args so we can validate body/body-file before calling gh
REPO=""
TITLE=""
BASE="main"
BODY=""
BODY_FILE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    -R)
      REPO="$2"; shift 2;;
    --title)
      TITLE="$2"; shift 2;;
    --base)
      BASE="$2"; shift 2;;
    --body)
      BODY="$2"; shift 2;;
    --body-file)
      BODY_FILE="$2"; shift 2;;
    *)
      # pass through unknown flags
      break;;
  esac
done

if [[ -z "$REPO" ]]; then
  echo "ERROR: Missing -R owner/repo" >&2
  exit 2
fi
if [[ -z "$TITLE" ]]; then
  echo "ERROR: Missing --title" >&2
  exit 2
fi

# Load body content for validation
BODY_CONTENT=""
if [[ -n "$BODY_FILE" ]]; then
  [[ -f "$BODY_FILE" ]] || { echo "ERROR: body file not found: $BODY_FILE" >&2; exit 2; }
  BODY_CONTENT="$(cat "$BODY_FILE")"
elif [[ -n "$BODY" ]]; then
  BODY_CONTENT="$BODY"
else
  echo "ERROR: Must provide --body or --body-file" >&2
  exit 2
fi

# Hard requirements (tune these to match your PR_GUIDELINES.md)
echo "$BODY_CONTENT" | grep -Eqi "$ACK_RE" || {
  echo "ERROR: PR body must include acknowledgment: 'I followed PR_GUIDELINES.md' (case-insensitive)" >&2
  exit 2
}

for section in "## Summary" "## Why" "## What changed" "## How to test"; do
  echo "$BODY_CONTENT" | grep -Fq "$section" || {
    echo "ERROR: PR body missing required section: $section" >&2
    exit 2
  }
done

# If we got here, body passes. Call gh.
if [[ -n "$BODY_FILE" ]]; then
  gh pr create -R "$REPO" --title "$TITLE" --base "$BASE" --body-file "$BODY_FILE" "$@"
else
  gh pr create -R "$REPO" --title "$TITLE" --base "$BASE" --body "$BODY" "$@"
fi
