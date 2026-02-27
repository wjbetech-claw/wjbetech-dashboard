API Contracts — Backend Surface (v1)

Authentication
- POST /api/auth/github — start OAuth flow (redirect)
- GET /api/auth/callback — handle OAuth callback, create user, return session cookie (HTTP-only)

User
- GET /api/me — returns current user
- PATCH /api/me — update settings

Repos & GitHub data
- GET /api/repos — list synced repos (query: page, per_page, filter)
- GET /api/repos/:id — repo detail with issues summary
- POST /api/repos/:id/sync — trigger immediate sync (auth required)

Issues & PRs
- GET /api/repos/:id/issues — list issues (query: filters)
- GET /api/repos/:id/issues/:number — issue detail
- GET /api/repos/:id/pulls — list PRs

Jobs
- GET /api/jobs — aggregated job feed (query: filters, page)
- GET /api/jobs/:id — job detail
- POST /api/jobs/import — import jobs via CSV (multipart)

Applications (ATS)
- GET /api/applications — list user's applications
- POST /api/applications — create application (body: job_id or manual fields)
- GET /api/applications/:id — detail
- PATCH /api/applications/:id — update stage, notes, next_step_date
- POST /api/applications/:id/resume — attach resume snapshot (multipart)

Search
- GET /api/search — global search (q, type=repo|job|issue|application)

Webhooks & Background
- POST /api/webhooks/github — endpoint for GitHub webhooks (validate signature)

Responses
- Use 200 for success, 201 for created, 4xx for client errors, 5xx for server
- Standard error format: { error: { code, message, details? } }

Rate limiting
- Implement per-user rate limits (e.g., 60 req/min) and return 429 with Retry-After

Pagination
- Use cursor-based pagination where possible (especially for large lists). Support page/per_page for simpler endpoints.

Security
- All POST/PATCH endpoints require authentication; use CSRF protections for session-based auth


