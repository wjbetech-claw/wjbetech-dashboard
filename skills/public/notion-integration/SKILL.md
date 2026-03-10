---
name: notion-integration
description: "Write, edit, and delete Notion pages/blocks on user request. Normalize Discord channel mentions by copying the raw channel name text the user provided. Use when the user asks the assistant to modify Notion content or annotate pages."
---

# Notion Integration Skill

Purpose
- Provide concise, repeatable rules and helper scripts for interacting with Notion on behalf of the user.
- Trigger when the user asks the assistant to read, write, edit, delete, comment, or otherwise modify Notion content.

Core Guidelines (imperative)
1. Act on user instructions: when the user asks the assistant to write, edit, or delete Notion content, perform the requested action without asking for additional permission. Perform reasonable safeguards (archive rather than permanently delete when applicable) and record the action as a comment or log entry for auditability.

2. Preserve user-disclosed Discord channel text: when the user links or refers to a Discord channel in a message, write the channel text exactly as the user provided (for example, write `#general-chat` instead of the channel UUID format such as `<#1477888020949762069>`). Do not attempt to map or resolve IDs — copy the raw name the user used in chat.

Triggering
- Use this skill when the user explicitly requests a Notion change ("add a comment", "archive this block", "add these to the TODO list", "move this page to database X", etc.).
- Also use when the user provides a Notion page or block URL and asks for actions on it.

Safe-action checklist
- Log every write/modify/delete action by adding a short comment on the affected page describing what was done and when (e.g., "Modified by notion-integration skill: archived block X — OpenClaw assistant").
- Prefer non-destructive operations: archive blocks first; only permanently delete when the user explicitly requests permanent deletion.
- When in doubt about ambiguous targets (multiple candidate blocks/pages), list candidates and operate only after the user confirms which one to change. But for explicit single-page requests, proceed without confirmation.

Formatting rules
- When writing content that includes a Discord channel, reuse the exact snippet the user typed for the channel name. If the user typed a <#...> mention, prefer the visible name they gave elsewhere in chat; if none exists, copy the raw mention string.

Scripts and helpers (bundled but optional)
- scripts/notion-comment.sh — small curl wrapper to post a comment on a page. Reads NOTION_API_KEY from /workspace/.env.
- scripts/notion-add-children.sh — wrapper to append child blocks to a page.
- scripts/revoke-notion-key.sh — helper to remove /workspace/.env (removes stored NOTION_API_KEY).

References
- Minimal Notion API notes and examples are available in references/notion-api.md (endpoints, version header, example bodies).

Examples (when to use)
- "OpenClaw, post a comment on this Notion page: <notion url>. Say I confirmed the TODO." → Trigger this skill and run the comment helper.
- "Delete the two items on this page and add these three items instead." → Trigger this skill and perform the archive + add-children flow.

Implementation notes
- The skill assumes an integration token is stored in /workspace/.env under NOTION_API_KEY. Scripts will read that value at runtime.
- Keep interactions minimal and explicit in logs so the user can review changes in Notion history.


