# TODO — OpenClaw Work Queue

Following docs/todo.md — topmost unchecked tasks. OpenClaw will work from the top down, creating branches, running checks, opening PRs, and auto-merging on green.

## Phase 1: MVP Backend & Data Layer (Foundation)

- [x] Task 1.1: Backend Project Setup — scaffold Node/Express backend, TypeScript, health route, env example, dev/build scripts

2026-03-01T13:06:00Z | chore/agent-2026-03-01-backend-project-setup | committed | Task 1.1 completed and scaffold committed
- [x] Task 1.2: Database Schema (Postgres) — migration 001_initial_schema.sql, DAOs, pg pool
- [x] Task 1.3: GitHub Integration & Sync Worker — Octokit wrapper, cron worker, rate-limit handling
- [x] Task 1.4: Core API Endpoints — repos, pulls, workflows, overview, jobs, active-job

2026-03-02T00:39:00Z | feat/core-api-endpoints | committed | Task 1.4 completed and scaffold committed
- [x] Task 1.5: Active Job Auto-Detection Logic — computeActiveJob service

2026-03-02T00:42:00Z | feat/active-job-auto-detection | committed | Task 1.5 completed and scaffold committed

- [ ] Task 1.6: GitHub backend wiring — fetch featured repos, repo activities, and PR tracking

  Plan:
  - Add backend endpoints under /api/github to proxy and aggregate GitHub data for the UI. Endpoints:
    - GET /api/github/featured -> returns a curated list of featured repos (from config/db) for orgs wjbetech and wjbetech-claw.
    - GET /api/github/repos/:owner/:repo/activities -> returns latest jobs/updates (from internal jobs table) and recent commits.
    - GET /api/github/orgs/:org/prs?limit=5 -> returns last N PRs for the organization.
  - Implementation details:
    1. Store a small config table (featured_repos) in Postgres with owner/repo and a 'featured' flag. Seed it via migration.
    2. Use the existing Octokit wrapper (backend/src/services/octokit.ts) to query the GitHub API. Implement rate-limit handling and caching (short TTL, in-memory LRU or Redis if available).
    3. Implement service functions that accept an authenticated Octokit instance and assemble responses: merge GitHub API data (commits, PRs) with internal DB job records (jobs table) to surface latest job status and timestamps.
    4. Secure endpoints with token-based access (GITHUB_TOKEN via env) and validate inputs. Respect GitHub API permissions and pagination.
    5. Add unit tests for service logic (mock Octokit responses) and integration tests that exercise the endpoints (use nock or msw to mock GitHub responses).
    6. Wire the frontend Repos page to call GET /api/github/featured and per-repo activities/PRs endpoints.
  - Rollout plan:
    - Add endpoints and tests behind feature flags in config; deploy to staging and validate UI.
    - Monitor rate limits and cache hit rates, adjust TTL and fallbacks (graceful degradation when GitHub is unavailable).

  Notes:
  - This task may require a GitHub App or higher-scoped token if you need org-level data; start with a PAT in env for initial development and switch to an app if needed.
  - Treat this as Task 1.6 and split into smaller PRs if implementation grows large.



## Phase 2: Frontend Components & Pages (UI Build)

- [x] Task 2.1: Base Components (Button, Card, Badge, Input, Modal, Table, Navbar, Sidebar)

2026-03-02T00:59:40Z | feat/base-components | committed | Task 2.1 marked complete (reused existing components, shadcn style to be applied as needed)
- [x] Task 2.2: Dashboard Overview Page — initial UX tweaks (navbar home link, spacing, button clarity)

2026-03-02T01:07:18Z | feat/dashboard-overview | committed | Task 2.2 initial UX tweaks committed and merged
- [ ] Task 2.2: Dashboard Overview Page — /, overview API binding, active job display
- [x] Task 2.3: Repositories Page — /repos, table, filters

2026-03-02T01:12:46Z | feat/repos-page | committed | Task 2.3 scaffold added (UI + test scaffold). Backend wiring deferred to Task 1.6.
- [ ] Task 2.4: Jobs Page & Kanban Board — /jobs, /board, Kanban persistence (wjb_kanban_v4)
- [ ] Task 2.5: Settings Page — theme toggle, integrations, notifications

## Phase 3: Testing, Accessibility, Refinement

- [ ] Task 3.1: Unit & Integration Tests — target >80% coverage
- [ ] Task 3.2: Accessibility Audit & Fixes — axe-core 0 violations
- [ ] Task 3.3: Performance & Optimization — Lighthouse >90

## Phase 4: Polish & Deployment

- [ ] Task 4.1: Error Handling & Edge Cases
- [ ] Task 4.2: Deployment & Env Configuration


---
Heartbeat log (append-only):

2026-02-24 13:15:00Z | wjbetech-dashboard | chore/agent-progress-2026-02-24-1315 | committed+pushed | package.json scripts added
