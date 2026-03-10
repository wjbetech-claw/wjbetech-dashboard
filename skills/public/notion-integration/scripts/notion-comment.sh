#!/bin/bash
# usage: ./notion-comment.sh PAGE_ID "Comment text"
PAGE_ID="$1"
TEXT="$2"
if [ -z "$PAGE_ID" ] || [ -z "$TEXT" ]; then
  echo "usage: $0 PAGE_ID \"Comment text\""
  exit 2
fi
NOTION_API_KEY="$(sed -n 's/^NOTION_API_KEY=//p' /workspace/.env 2>/dev/null)"
if [ -z "$NOTION_API_KEY" ]; then
  echo "NOTION_API_KEY not found in /workspace/.env"
  exit 3
fi
curl -s -X POST "https://api.notion.com/v1/comments" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d "{\"parent\": { \"page_id\": \"${PAGE_ID}\" }, \"rich_text\": [ { \"type\": \"text\", \"text\": { \"content\": \"${TEXT}\" } } ] }"

exit $?
