#!/bin/bash
# Remove stored Notion key from /workspace/.env if present
TARGET="/workspace/.env"
if [ ! -f "$TARGET" ]; then
  echo "No /workspace/.env found"
  exit 0
fi
# Remove NOTION_API_KEY lines only
tmpfile=$(mktemp)
grep -v '^NOTION_API_KEY=' "$TARGET" > "$tmpfile" && mv "$tmpfile" "$TARGET"
chmod 600 "$TARGET"
echo "Removed NOTION_API_KEY from $TARGET"
exit 0
