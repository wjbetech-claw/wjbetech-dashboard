Notion API — minimal reference (for skill use)

- Notion-Version header: 2022-06-28
- Authorization: Bearer <integration-token>

Common endpoints used by this skill:
- POST /v1/comments  -> create a comment on a page
- GET /v1/blocks/{block_id}/children -> list child blocks
- PATCH /v1/blocks/{block_id}/children -> append child blocks
- PATCH /v1/blocks/{block_id} -> archive/unarchive or update block properties
- POST /v1/search -> search workspace pages

Examples
- Create comment body:
{
  "parent": { "page_id": "<PAGE_ID>" },
  "rich_text": [ { "type": "text", "text": { "content": "Your comment text" } } ]
}

- Add children body:
{
  "children": [
    { "object": "block", "type": "to_do", "to_do": { "rich_text": [{ "type":"text","text":{"content":"New to-do"}}], "checked": false } }
  ]
}

Notes
- Prefer archiving (PATCH block with archived=true) rather than permanent deletion.
- Use comments for audit trails when modifying/deleting content.
