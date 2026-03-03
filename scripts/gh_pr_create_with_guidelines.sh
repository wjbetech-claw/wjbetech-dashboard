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
HEAD_REF=""
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
    --head)
      HEAD_REF="$2"; shift 2;;
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

# Reject literal "\n" sequences (double-escaped content)
echo "$BODY_CONTENT" | grep -q '\\n' && {
  printf "ERROR: PR body contains literal \\n escape sequences; must contain real newlines." >&2
  exit 2
}

# Reject ANSI escape codes (terminal color/control sequences)
printf '%s' "$BODY_CONTENT" | LC_ALL=C grep -q $'\x1b' && {
  echo "ERROR: PR body contains ANSI escape codes; do not paste terminal output into PR body." >&2
  exit 2
}

# Reject literal escaped ANSI sequences and common mojibake escape artifacts.
echo "$BODY_CONTENT" | grep -Eqi '\\u001b|\\x1b|�\[' && {
  echo "ERROR: PR body appears to contain escaped/garbled ANSI output; sanitize terminal logs before PR creation." >&2
  exit 2
}

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
  if [[ -n "$HEAD_REF" ]]; then
    gh pr create -R "$REPO" --title "$TITLE" --base "$BASE" --head "$HEAD_REF" --body-file "$BODY_FILE" "$@"
  else
    gh pr create -R "$REPO" --title "$TITLE" --base "$BASE" --body-file "$BODY_FILE" "$@"
  fi
else
  if [[ -n "$HEAD_REF" ]]; then
    gh pr create -R "$REPO" --title "$TITLE" --base "$BASE" --head "$HEAD_REF" --body "$BODY" "$@"
  else
    gh pr create -R "$REPO" --title "$TITLE" --base "$BASE" --body "$BODY" "$@"
  fi
fi
