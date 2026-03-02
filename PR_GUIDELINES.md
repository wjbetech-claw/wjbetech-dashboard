PR Comment Guidelines

Purpose

This document explains the recommended format and common pitfalls when writing pull request titles and descriptions for this repository. Follow these rules to keep PRs readable, reviewable, and properly rendered in GitHub.

Guidelines

1) Use plain text with real newlines
- Write the PR body as plain text with actual newline characters. Do not paste escape sequences like "\n" — GitHub will render those literally.

2) Start with a one-line summary
- First line: short summary (<= 80 characters). This appears in lists and is used for quick scanning.

3) Separate details with blank lines
- Add a blank line after the summary, then provide details in paragraphs and bullet lists.

4) Use bullet lists for changes/notes
- Use hyphens (-) to create bullet lists. Keep lines wrapped at 72-80 characters where possible.

5) Use headings sparingly
- Small headings (like "What changed:" or "Testing:") help structure longer PRs. Use plain text headings with a blank line before and after.

6) Avoid inline code for plain text
- Only use backticks for inline code identifiers (e.g. `npm run test`). Do not escape newlines or include JSON with raw backslash escapes.

7) Include testing and deployment notes
- Mention how to test the changes locally, required environment variables, and migration steps if any.

8) Keep it concise and actionable
- Reviewers should be able to understand the change and how to verify it without running the code.

Example PR body

Add Overview page wired to backend endpoints

What changed:
- Add `src/pages/overview.tsx` which calls `/api/github/featured` and `/api/active-job`.
- Display featured repos and the currently active job with links and timestamps.

Notes:
- Endpoints may return placeholders if backend is not configured.
- Run `npm run dev` and ensure `DATABASE_URL` and `GITHUB_TOKEN` are set.

Testing:
- Local: `npm ci && npm run dev`, open http://localhost:3000
- CI: vitest runs unit/integration tests on PRs.

Common mistake to avoid

Bad: pasting a string that contains literal escape sequences:
"Add feature X\n\nDetails:\n- thing 1\n- thing 2"

Good: use real newlines and formatting (as shown in the example above).

If you automate PR creation (script or CLI), ensure the tool sends the body as plain text (not JSON-escaped) and does not double-escape characters.
