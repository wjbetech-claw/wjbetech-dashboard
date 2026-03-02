Backend consolidation: files and changes included in this PR

This PR groups the backend work currently present in the repository for easier review and tracking.

Included areas (high level):

- Migrations:
  - db/migrations/001_initial_schema.sql
  - db/migrations/002_featured_repos.sql
  - db/migrations/003_jobs_table.sql
  - (new) db/migrations/004_jobs_position.sql (if present)

- Services:
  - backend/src/services/octokit.ts (Octokit wrapper, cached helper, withRateLimit)
  - backend/src/services/githubService.ts (getFeaturedRepos, getOrgPRs, getRepoActivities)
  - backend/src/services/activeJob.ts

- Controllers & Routes:
  - backend/src/controllers/jobsController.ts
  - backend/src/routes/jobs.ts
  - backend/src/routes/github.ts
  - backend/src/routes/repos.ts

- Backend app wiring:
  - backend/src/index.ts (mounts /api/repos, /api/github, /api/jobs)

- Tests (unit/integration scaffolds):
  - test/githubService.test.ts
  - test/octokit.test.ts
  - test/octokit_rl.test.ts
  - test/integration/github.routes.test.ts

Notes:
- This PR does not add runtime DB changes — run migrations on your DB to apply schema updates.
- The Octokit service uses a simple in-memory cache and basic rate-limit/backoff; consider swapping to an LRU or Redis in production.
- Some test runners (Vitest) are present and CI is configured to run tests; ensure CI has access to devDependencies.

What to review:
- Verify migrations are correct for your DB.
- Verify environment variables needed: DATABASE_URL, GITHUB_TOKEN.
- Confirm that Octokit usage respects rate limits and permissions for your tokens.

