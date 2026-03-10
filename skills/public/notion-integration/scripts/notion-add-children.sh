#!/bin/bash
# usage: ./notion-add-children.sh PAGE_ID JSON_CHILDREN_FILE
PAGE_ID="$1"
CHILD_FILE="$2"
if [ -z "$PAGE_ID" ] || [ -z "$CHILD_FILE" ]; then
  echo "usage: $0 PAGE_ID JSON_CHILDREN_FILE"
  exit 2
fi
if [ ! -f "$CHILD_FILE" ]; then
  echo "child file not found: $CHILD_FILE"
  exit 3
fi
NOTION_API_KEY="$(sed -n 's/^NOTION_API_KEY=//p' /workspace/.env 2>/dev/null)"
if [ -z "$NOTION_API_KEY" ]; then
  echo "NOTION_API_KEY not found in /workspace/.env"
  exit 4
fi
curl -s -X PATCH "https://api.notion.com/v1/blocks/${PAGE_ID}/children" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d @"${CHILD_FILE}"

exit $?
