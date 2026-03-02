# TODO — OpenClaw Work Queue

Following docs/todo.md — topmost unchecked tasks. OpenClaw will work from the top down, creating branches, running checks, opening PRs, and auto-merging on green.

## Phase 1: MVP Backend & Data Layer (Foundation)

- [x] Task 1.1: Backend Project Setup — scaffold Node/Express backend, TypeScript, health route, env example, dev/build scripts

2026-03-01T13:06:00Z | chore/agent-2026-03-01-backend-project-setup | committed | Task 1.1 completed and scaffold committed
- [x] Task 1.2: Database Schema (Postgres) — migration 001_initial_schema.sql, DAOs, pg pool
- [x] Task 1.3: GitHub Integration & Sync Worker — Octokit wrapper, cron worker, rate-limit handling
- [x] Task 1.4: Core API Endpoints — repos, pulls, workflows, overview, jobs, active-job

2026-03-02T00:39:00Z | feat/core-api-endpoints | committed | Task 1.4 completed and scaffold committed
- [ ] Task 1.5: Active Job Auto-Detection Logic — computeActiveJob service

## Phase 2: Frontend Components & Pages (UI Build)

- [ ] Task 2.1: Base Components (Button, Card, Badge, Input, Modal, Table, Navbar, Sidebar)
- [ ] Task 2.2: Dashboard Overview Page — /, overview API binding, active job display
- [ ] Task 2.3: Repositories Page — /repos, table, filters
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
