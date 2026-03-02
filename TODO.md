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

  Subtasks:
  - [ ] Task 1.6.1: DB migration & seed — create featured_repos table and seed initial entries for wjbetech and wjbetech-claw.
  - [ ] Task 1.6.2: Octokit service & caching — improve Octokit wrapper with rate-limit awareness and in-memory caching.
  - [ ] Task 1.6.3: API endpoints — implement /api/github/featured, /api/github/repos/:owner/:repo/activities, /api/github/orgs/:org/prs.
  - [ ] Task 1.6.4: Service tests — unit tests mocking Octokit responses and verifying aggregation logic.
  - [ ] Task 1.6.5: Integration tests & CI — add integration tests for endpoints using msw/nock and enable CI steps to run them.
  - [ ] Task 1.6.6: Frontend wiring — connect Repos page to the new endpoints, fetch activities and PRs, display dates and links.

  High-level plan:
  - Implement 1.6.1 first (DB migration + seed) so the backend has a persisted source of featured repos.
  - Then implement 1.6.2 (Octokit improvements) and 1.6.3 (endpoints) in small PRs, each with unit tests (1.6.4).
  - Enable integration tests (1.6.5) and wire frontend (1.6.6).

  Notes:
  - Start with a PAT in env for dev; consider GitHub App later for org-level permissions.
  - Keep each subtask small and independently mergeable.


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
