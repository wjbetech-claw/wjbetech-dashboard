Integrations — GitHub

Scope
- OAuth for authentication and repo access
- API usage: repo list, issues, PRs, checks, commits
- Optional webhooks: subscribe to repo events to keep data current

OAuth
- Use GitHub OAuth app with standard scopes: repo (read-only), read:user, user:email
- Support multiple accounts: store github_id and access_token encrypted
- Refresh tokens: GitHub tokens don’t use refresh tokens; request necessary scopes and re-auth when token revoked

API patterns
- Use conditional requests (ETag/If-Modified-Since) to reduce rate usage
- Cache responses for 5–15 minutes; allow user-triggered refresh
- Use GraphQL for batched queries (reduce requests) where efficient

Webhooks
- Optional: let users configure webhook listener to receive push, issues, pull_request, check_run events for repos they authorize
- Webhook receiver: validate signatures and queue events for processing (idempotent handlers)

Rate limiting & best practices
- Respect GitHub rate limits and provide graceful degradation
- For heavy syncs, recommend using a background job queue (BullMQ/Redis or background workers)

Data mapping
- Map GitHub check_runs and statuses to checks_status in PR model
- Map labels to issue.labels array

Security
- Store tokens encrypted (at-rest), minimize token scope
- Revoke tokens on account disconnect

Permissions UI
- When connecting GitHub, clearly show which scopes are requested and why

Testing
- Mock GitHub API responses in tests using tools like nock or msw


