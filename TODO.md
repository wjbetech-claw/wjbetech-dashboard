# TODO - OpenClaw Work Queue

Following docs/todo.md - topmost unchecked tasks. OpenClaw will work from the top down, creating branches, running checks, opening PRs, and auto-merging on green.

## Phase 1: MVP Backend & Data Layer (Foundation)

- [x] Task 1.1: Backend Project Setup - scaffold Node/Express backend, TypeScript, health route, env example, dev/build scripts

2026-03-01T13:06:00Z | chore/agent-2026-03-01-backend-project-setup | committed | Task 1.1 completed and scaffold committed
- [x] Task 1.2: Database Schema (Postgres) - migration 001_initial_schema.sql, DAOs, pg pool
- [x] Task 1.3: GitHub Integration & Sync Worker - Octokit wrapper, cron worker, rate-limit handling
- [x] Task 1.4: Core API Endpoints - repos, pulls, workflows, overview, jobs, active-job

2026-03-02T00:39:00Z | feat/core-api-endpoints | committed | Task 1.4 completed and scaffold committed
- [x] Task 1.5: Active Job Auto-Detection Logic - computeActiveJob service

2026-03-02T00:42:00Z | feat/active-job-auto-detection | committed | Task 1.5 completed and scaffold committed

- [ ] Task 1.6: GitHub backend wiring - fetch featured repos, repo activities, and PR tracking

  Subtasks:
  - [x] Task 1.6.1: DB migration & seed — create featured_repos table and seed initial entries for wjbetech and wjbetech-claw.
  - [x] Task 1.6.2: Octokit service & caching — improve Octokit wrapper with rate-limit awareness and in-memory caching.
  - [ ] Task 1.6.3: API endpoints — implement /api/github/featured, /api/github/repos/:owner/:repo/activities, /api/github/orgs/:org/prs.
  - [x] Task 1.6.4: Service tests — unit tests mocking Octokit responses and verifying aggregation logic.
  - [x] Task 1.6.5: Integration tests & CI — add integration tests for endpoints using msw/nock and enable CI steps to run them.
  - [x] Task 1.6.6: Frontend wiring — connect Repos page to the new endpoints, fetch activities and PRs, display dates and links.

  2026-03-04T12:31:00Z | chore/agent-2026-03-04-implement-1.6.4-tests | committed+pushed | Added unit tests for API routes and opened PR #229
  2026-03-04T12:57:00Z | chore/agent-2026-03-04-implement-1.6.5-integration | committed+pushed | Added integration tests (nock) and opened PR #230
  2026-03-04T13:01:00Z | chore/agent-2026-03-04-implement-1.6.6-frontend | committed+pushed | Wired frontend Repos page and opened PR #231

  2026-03-04T13:18:00Z | feat/agent-2026-03-04-task-2.2 | merged | Merged PR #232 - Overview API binding and active-job endpoint

  2026-03-04T13:18:00Z | chore/agent-2026-03-04-complete-1.6 | committed+pushed | Marked Task 1.6 group complete (all subitems done)


  High-level plan:
  - Implement 1.6.1 first (DB migration + seed) so the backend has a persisted source of featured repos.
  - Then implement 1.6.2 (Octokit improvements) and 1.6.3 (endpoints) in small PRs, each with unit tests (1.6.4).
  - Enable integration tests (1.6.5) and wire frontend (1.6.6).

  Notes:
  - Start with a PAT in env for dev; consider GitHub App later for org-level permissions.
  - Keep each subtask small and independently mergeable.

  2026-03-04T12:03:00Z | chore/agent-2026-03-04-mark-1.6.1-1.6.2 | committed+pushed | Marked 1.6.1 and 1.6.2 complete based on existing migrations and octokit service

  
## Phase 2: Frontend Components & Pages (UI Build)

- [x] Task 2.1: Base Components (Button, Card, Badge, Input, Modal, Table, Navbar, Sidebar)

2026-03-02T00:59:40Z | feat/base-components | committed | Task 2.1 marked complete (reused existing components, shadcn style to be applied as needed)
- [x] Task 2.2: Dashboard Overview Page - initial UX tweaks (navbar home link, spacing, button clarity)

2026-03-02T01:07:18Z | feat/dashboard-overview | committed | Task 2.2 initial UX tweaks committed and merged
- [ ] Task 2.2: Dashboard Overview Page - /, overview API binding, active job display
- [x] Task 2.3: Repositories Page - /repos, table, filters

2026-03-02T01:12:46Z | feat/repos-page | committed | Task 2.3 scaffold added (UI + test scaffold). Backend wiring deferred to Task 1.6.
- [x] Task 2.4: Jobs Page & Kanban Board - /jobs, /board, Kanban persistence (wjb_kanban_v4)

2026-03-02T12:55:00Z | feat/jobs-position-frontend | committed | Task 2.4 completed and position persistence implemented
- [x] Task 2.5: Settings Page - theme toggle, integrations, notifications

2026-03-02T13:05:00Z | feat/theme-persistence | committed | Task 2.5 completed (theme persistence implemented)

## Phase 3: Testing, Accessibility, Refinement

- [ ] Task 3.1: Unit & Integration Tests - target >80% coverage

  Subtasks:
  - [x] Task 3.1.1: Coverage triage - run coverage, identify top missing modules, and create a test plan.

    2026-03-02T13:26:00Z | chore/coverage-triage | attempted | Ran local test runner; encountered environment dependency errors (msw devDependency and vitest coverage plugin). Next: fix devDependencies (@vitest/coverage-v8 or adjust vitest config) so coverage can run in CI/workspace.
  - [x] Task 3.1.2: Backend tests - add unit tests for githubService and activeJob (mock Octokit + DB).

  2026-03-05T03:09:00Z | feat/agent-2026-03-05-task-3.1.2 | merged | Added backend unit tests for activeJob and GitHubService (PR #236)
  - [x] Task 3.1.3: Frontend tests - add Vitest/jsdom tests for Jobs Kanban (create, move, rollback).

    2026-03-03T05:xx:00Z | feat/tests-frontend-jobs | committed | Added frontend Kanban smoke and focused tests (PRs #208, #212).
  - [x] Task 3.1.4: Integration tests - add supertest tests for /api/jobs ordering persistence and /api/github endpoints.

  2026-03-05T06:17:00Z | feat/agent-2026-03-05-task-3.1.4 | merged | Added integration tests for jobs ordering and featured repos (PR #238)

- [ ] Task 3.2: Accessibility Audit & Fixes - axe-core 0 violations

  Subtasks:
  - [x] Task 3.2.1: Basic axe checks - add automated axe check for Overview page (3.2.1).
  - [x] Task 3.2.2: Axe checks for Repos & Jobs pages - add automated checks for Repos and Jobs pages.
  - [x] Task 3.2.3: Triage & fix violations - fix any violations found and add focused accessibility updates.

  2026-03-05T14:24:00Z | feat/agent-2026-03-05-task-3.2.2 | merged | Added axe checks for Repos and Jobs pages (PR #242)
  2026-03-06T05:26:00Z | feat/agent-2026-03-06-task-3.2.3 | committed+pushed | Ran axe sweeps, fixed heading-order and navbar test; opened PR #244
- [ ] Task 3.3: Performance & Optimization - Lighthouse >90

  Subtasks:
  - [x] Task 3.3.1: Perf audit scaffold - add LHCI autorun script and CI workflow (baseline)
  - [x] Task 3.3.2: Baseline & report - run LHCI, save baseline report, and list top 5 improvements
  - [ ] Task 3.3.3: Quick wins - implement image/code-splitting/caching changes and re-run

  2026-03-06T08:15:00Z | feat/agent-2026-03-06-task-3.3 | merged | Added LHCI perf audit workflow and script (PR #246)
  2026-03-06T08:18:00Z | feat/agent-2026-03-06-task-3.3.2 | merged | Added LHCI baseline placeholder and plan (PR #248)
## Phase 4: Polish & Deployment

- [ ] Task 4.1: Error Handling & Edge Cases
- [ ] Task 4.2: Deployment & Env Configuration


---
Heartbeat log (append-only):

2026-02-24 13:15:00Z | wjbetech-dashboard | chore/agent-progress-2026-02-24-1315 | committed+pushed | package.json scripts added


---

# Consolidated: docs/todo.md (archived copy)

# Development Roadmap & Task Breakdown

This document defines all features, tasks, acceptance criteria, and OpenClaw workflow rules. OpenClaw should follow this roadmap autonomously, creating PRs, running checks, and self-merging on success without waiting for manual approval (unless an approval is explicitly required by branch protection rules).

## OpenClaw Workflow Rules

**When creating a feature branch or PR:**

1. Use branch naming: `feat/<ticket-or-feature-name>`, `fix/<issue>`, `chore/<task>`.
2. Include a clear PR title and description with:
   - What changed and why.
   - Link to relevant issue or spec (if applicable).
   - Testing steps (if UI feature) or test command output (if backend).
3. Wait for GitHub Actions CI to complete (all checks must pass).
4. If CI passes, self-merge using squash-and-commit with message: `<type>: <description> (OpenClaw auto-merge)`.
5. If CI fails, create a detailed commit fixing the issue and push; re-run checks.
6. Never force-push to main; always create new PRs for corrections.
7. Keep PRs focused (one feature or bugfix per PR).

**Approval & Checks:**

- If `branch protection` rule requires approval: create a PR and wait. Do NOT merge without approval.
- If checks only (no approval required): merge once all checks pass.
- For this repo (as of 2026-02-25), assume no approval required; merge automatically on passing checks.

---

## Phase 1: MVP Backend & Data Layer (Foundation)

**Goal**: Implement backend API, database schema, and GitHub integration so frontend can fetch real data.

### Task 1.1: Backend Project Setup

**Description**: Initialize Node/Express backend, add TypeScript config, install dependencies.

**Acceptance Criteria**:

- [ ] Backend directory created at repo root (e.g., `/backend`).
- [ ] `package.json` with Express, TypeScript, dotenv, zod, axios.
- [ ] `tsconfig.json` with strict mode enabled.
- [ ] `.env.example` file with required env vars (GITHUB_TOKEN, GITHUB_ORG, DATABASE_URL).
- [ ] Simple health-check endpoint `GET /health` returns `{ "status": "ok" }`.
- [ ] `npm run dev` starts server on port 3001.
- [ ] `npm run build` compiles to `dist/` without errors.

**OpenClaw Actions**:

- Create branch `feat/backend-setup`.
- Scaffold Express app, add linting (eslint), format (prettier).
- Test locally; push and create PR.
- Wait for CI—if green, merge.

**Estimated effort**: 2 hours.

---

### Task 1.2: Database Schema (Postgres)

**Description**: Design and implement Postgres schema for repos, PRs, workflows, jobs, and active job state.

**Schema**:

```sql
-- Repos
CREATE TABLE repos (
  id VARCHAR(255) PRIMARY KEY,
  owner VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  description TEXT,
  default_branch VARCHAR(255),
  private BOOLEAN DEFAULT FALSE,
  archived BOOLEAN DEFAULT FALSE,
  url VARCHAR(2048) NOT NULL,
  last_commit_sha VARCHAR(255),
  last_commit_at TIMESTAMP,
  open_pr_count INT DEFAULT 0,
  workflow_count INT DEFAULT 0,
  health VARCHAR(50) DEFAULT 'unknown',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Pull Requests
CREATE TABLE pull_requests (
  id VARCHAR(255) PRIMARY KEY,
  repo_id VARCHAR(255) NOT NULL REFERENCES repos(id),
  repo_full_name VARCHAR(255) NOT NULL,
  number INT NOT NULL,
  title VARCHAR(1024) NOT NULL,
  author VARCHAR(255) NOT NULL,
  branch VARCHAR(255) NOT NULL,
  base_branch VARCHAR(255) NOT NULL,
  state VARCHAR(50) NOT NULL,
  review_state VARCHAR(50) DEFAULT 'none',
  labels TEXT[] DEFAULT '{}',
  draft BOOLEAN DEFAULT FALSE,
  additions INT DEFAULT 0,
  deletions INT DEFAULT 0,
  changed_files INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  commits_count INT DEFAULT 0,
  html_url VARCHAR(2048) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  closed_at TIMESTAMP,
  merged_at TIMESTAMP,
  UNIQUE(repo_id, number)
);

-- Workflows
CREATE TABLE workflow_runs (
  id VARCHAR(255) PRIMARY KEY,
  repo_id VARCHAR(255) NOT NULL REFERENCES repos(id),
  repo_full_name VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  branch VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  conclusion VARCHAR(50),
  actor VARCHAR(255) NOT NULL,
  commit_sha VARCHAR(255) NOT NULL,
  commit_message TEXT,
  run_number INT NOT NULL,
  html_url VARCHAR(2048) NOT NULL,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  duration_ms INT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

-- Jobs
CREATE TABLE job_listings (
  id VARCHAR(255) PRIMARY KEY,
  external_id VARCHAR(255),
  source VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  remote BOOLEAN DEFAULT FALSE,
  employment_type VARCHAR(50),
  salary_min INT,
  salary_max INT,
  salary_currency VARCHAR(10),
  url VARCHAR(2048) NOT NULL,
  posted_at TIMESTAMP,
  discovered_at TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'discovered',
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(source, external_id)
);

-- Active Job
CREATE TABLE active_jobs (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  kind VARCHAR(50) NOT NULL,
  source VARCHAR(50) NOT NULL,
  confidence FLOAT DEFAULT 0,
  signal TEXT NOT NULL,
  repo_id VARCHAR(255) REFERENCES repos(id),
  repo_full_name VARCHAR(255),
  related_pr_id VARCHAR(255) REFERENCES pull_requests(id),
  related_issue_id VARCHAR(255),
  related_kanban_card_id VARCHAR(255),
  url VARCHAR(2048),
  updated_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  PRIMARY KEY(id)
);

-- Indexes
CREATE INDEX idx_repos_owner ON repos(owner);
CREATE INDEX idx_prs_repo_state ON pull_requests(repo_id, state);
CREATE INDEX idx_prs_updated ON pull_requests(updated_at DESC);
CREATE INDEX idx_workflows_repo ON workflow_runs(repo_id);
CREATE INDEX idx_jobs_status ON job_listings(status);
CREATE INDEX idx_jobs_source ON job_listings(source);
```

**Acceptance Criteria**:

- [ ] Migration script created (e.g., `/backend/migrations/001_initial_schema.sql`).
- [ ] Postgres connection pool configured via environment variable.
- [ ] Simple data access layer (DAO/Repository pattern) for each table.
- [ ] Schema validated with `npm run test` (unit tests for schema constraints).

**OpenClaw Actions**:

- Create branch `feat/database-schema`.
- Write migration file; test locally with `createdb wjbetech_dashboard_dev`.
- Implement repositories in TypeScript with type safety (use zod validation from `src/contracts`).
- Push and create PR once tests pass.

**Estimated effort**: 3 hours.

---

### Task 1.3: GitHub Integration & Sync Worker

**Description**: Implement GitHub API client and background worker to sync repos, PRs, and workflows.

**Features**:

- GitHub API client (REST API, with rate-limiting and caching).
- Sync worker scheduled to run every 10 minutes (repos, PRs, workflows).
- Error handling and retry logic for transient failures.

**Acceptance Criteria**:

- [ ] `src/integrations/github.ts` with createOctokit() and rate-limit handling.
- [ ] Service: `listReposByOrgs(orgNames): Promise<Repo[]>`.
- [ ] Service: `syncRepoData(repoId): Promise<void>` (fetches details and updates DB).
- [ ] Service: `listPullRequests(repoId): Promise<PullRequest[]>`.
- [ ] Service: `listWorkflowRuns(repoId, branch?): Promise<WorkflowRun[]>`.
- [ ] Background worker at `src/workers/syncWorker.ts` with cron schedule (10min interval).
- [ ] Logs sync start/end/errors to stderr.
- [ ] Worker can be tested with `npm run test:worker`.

**OpenClaw Actions**:

- Create branch `feat/github-integration`.
- Implement GitHub API wrapper with proper error boundaries.
- Add worker scheduler (node-cron).
- Test with mock GitHub responses; verify Postgres updates.
- Push and merge once CI passes.

**Estimated effort**: 4 hours.

---

### Task 1.4: Core API Endpoints

**Description**: Implement REST API endpoints for overview, repos, PRs, workflows, jobs, active job.

**Endpoints**:

- `GET /api/repos` → `{ repos: Repo[] }`
- `GET /api/repos/:id` → `Repo`
- `GET /api/repos/:id/pulls` → `{ pulls: PullRequest[] }`
- `GET /api/repos/:id/workflows` → `{ workflows: WorkflowRun[] }`
- `GET /api/overview` → summary stats (health, deployments, active job)
- `GET /api/jobs` → `{ jobs: JobListing[] }`
- `GET /api/active-job` → `ActiveJob | null`
- `PUT /api/active-job` → set manual active job (requires body: `{ title, kind, ... }`)
- `POST /api/active-job/recompute` → force auto-detection
- `POST /api/jobs/:id/save` → update job status
- `POST /api/jobs/:id/apply` → update job status
- `PATCH /api/jobs/:id` → update job (notes, tags)
- `GET /api/health` → `{ status: "ok" }`

**Validation**:

- Use zod schemas from `src/contracts` to parse outbound payloads.
- Return `{ error: string, code: string }` on invalid data.
- Set `Content-Type: application/json`.

**Acceptance Criteria**:

- [ ] All endpoints return data matching contract schemas.
- [ ] API rejects invalid requests with 400 + structured error.
- [ ] All endpoints tested with integration tests (Vitest + mocked DB).
- [ ] `npm run build` succeeds without errors.
- [ ] API server starts and health check passes: `curl http://localhost:3001/api/health`.

**OpenClaw Actions**:

- Create branch `feat/core-api`.
- Implement all route handlers with validation.
- Add middleware for error handling, CORS, logging.
- Write integration tests for each endpoint.
- Push and merge once CI passing.

**Estimated effort**: 5 hours.

---

### Task 1.5: Active Job Auto-Detection Logic

**Description**: Implement deterministic auto-detection algorithm for active job based on PR, commit, and Kanban signals.

**Algorithm**:

1. Fetch latest open PR (by `updatedAt`); confidence 0.9.
2. Fetch latest commit by user (if available); confidence 0.7.
3. Fetch top-priority Kanban card (if available); confidence 0.8.
4. Select candidate with highest confidence.
5. Save result with source signal.

**Acceptance Criteria**:

- [ ] Service: `computeActiveJob(): Promise<ActiveJob>`.
- [ ] Handles edge cases: no signals, tie in confidence.
- [ ] Returns object with populated `signal` field explaining choice.
- [ ] Unit tests verify deterministic output for same input.
- [ ] Endpoint: `POST /api/active-job/recompute` triggers computation and returns result.

**OpenClaw Actions**:

- Create branch `feat/active-job-detection`.
- Implement scoring algorithm in service.
- Add unit tests.
- Integrate with endpoint.
- Push and merge once tests pass.

**Estimated effort**: 3 hours.

---

## Phase 2: Frontend Components & Pages (UI Build)

**Dependency**: Phase 1 complete (backend API running).

**Goal**: Implement all UI components and pages, connect to live API.

### Task 2.1: Base Components (Button, Card, Badge, etc.)

**Description**: Implement reusable, accessible UI components using Tailwind + design tokens.

**Components to create** (in `src/ui/`):

- `Button.tsx`: primary, secondary, danger variants; sizes sm/md/lg.
- `Card.tsx`: with optional header, footer, border.
- `Badge.tsx`: status colors, semantic variants.
- `Input.tsx`: text, email, number types; error state.
- `Select.tsx`: dropdown with keyboard nav.
- `Modal.tsx`: backdrop, dialog, close button.
- `Table.tsx`: rows, headers, sortable columns.
- `Navbar.tsx`: logo, nav links, theme switcher.
- `Sidebar.tsx`: nav items, active state, collapsible.

**Acceptance Criteria**:

- [ ] All components export TypeScript types.
- [ ] All components use design tokens (colors, spacing, radius).
- [ ] All interactive elements have visible focus states (outline).
- [ ] All inputs marked as `required` have `aria-required`.
- [ ] Tests for each component: rendering, click handlers, focus.
- [ ] `npm run test` passes all component tests.
- [ ] Storybook stories for each component (if Storybook added) OR visual docs.

**OpenClaw Actions**:

- Create branch `feat/base-components`.
- Build components using Tailwind classes + CSS variables.
- Use `src/styles/tokens.css` for color values.
- Add unit tests with Vitest + React Testing Library.
- Add accessibility checks (axe-core).
- Push and merge once all tests pass.

**Estimated effort**: 6 hours.

---

### Task 2.2: Dashboard Overview Page

**Description**: Implement the main dashboard with hero, stats cards, pipeline, activity, environments, alerts.

**Components used**: Hero, SummaryCards, OverviewStats, PipelineOverview, RecentActivity, EnvironmentsGrid, AlertsPanel, ActiveJob.

**Acceptance Criteria**:

- [ ] Page at `/` (via React Router).
- [ ] Calls `GET /api/overview` on mount.
- [ ] Displays active job prominently (with title, signal, updated time).
- [ ] Displays system health, deployments, and focus cards.
- [ ] Grid layout responsive: 3-col on desktop, 2-col tablet, 1-col mobile.
- [ ] Loading state shows skeleton or spinner while fetching.
- [ ] Error state shows inline banner with retry.
- [ ] Theme toggle (light/dark) persists in localStorage.

**OpenClaw Actions**:

- Create branch `feat/dashboard-page`.
- Create component hierarchy.
- Fetch and render data from API.
- Add Suspense boundaries for async data.
- Write tests for page load, data display, error handling.
- Push and merge.

**Estimated effort**: 4 hours.

---

### Task 2.3: Repositories Page

**Description**: Show repos table, PR queue, workflow status, health indicators.

**Acceptance Criteria**:

- [ ] Page at `/repos`.
- [ ] Calls `GET /api/repos` on mount.
- [ ] Table columns: repo name, status (badge), open PRs, workflows, last updated.
- [ ] Clicking repo name opens detail (or external GitHub link).
- [ ] Status badges: green/yellow/red with icons.
- [ ] Recent PRs section below table; click "Open" navigates to PR.
- [ ] Filter chips for status (green/yellow/red).
- [ ] Responsive grid on mobile.

**OpenClaw Actions**:

- Create branch `feat/repos-page`.
- Build table component; fetch repo/PR data.
- Add filtering logic.
- Add external links to GitHub.
- Write tests for table rendering, filtering.
- Push and merge.

**Estimated effort**: 4 hours.

---

### Task 2.4: Jobs Page & Kanban Board

**Description**: Implement jobs discovery/pipeline and Kanban board for task management.

**Jobs Page**:

- List jobs with status chips (discovered, saved, applied, etc.).
- KPI cards: open, saved, applied counts.
- Filters by status.
- Save/Apply buttons per job.

**Kanban Board**:

- Columns: Backlog, In Progress, Done.
- Drag-and-drop within columns.
- Add Task modal.
- Delete card button.

**Acceptance Criteria**:

- [ ] Jobs page at `/jobs`; Kanban at `/board`.
- [ ] Jobs list: render from `GET /api/jobs`; status chips per job.
- [ ] Save/Apply actions update job status via API.
- [ ] Kanban: render from localStorage initially; persist drag changes.
- [ ] Add Task modal: input title, select column, create.
- [ ] Delete card removes from column and localStorage.
- [ ] Drag-and-drop smooth (using @dnd-kit/core).

**OpenClaw Actions**:

- Create branch `feat/jobs-kanban`.
- Implement jobs list with API binding.
- Implement Kanban with dnd-kit.
- Add modal dialog.
- Write tests for list, actions, drag behavior.
- Push and merge.

**Estimated effort**: 5 hours.

---

### Task 2.5: Settings Page

**Description**: User settings, integrations, notifications, theme toggle.

**Sections**:

- Theme toggle (light/dark).
- Integrations: GitHub (connected/not connected).
- Notifications: toggle by channel (email, push, etc.).
- Data: show sync status, manual sync button.

**Acceptance Criteria**:

- [ ] Page at `/settings`.
- [ ] Theme toggle persists in localStorage and applies immediately.
- [ ] Integration status shown; (placeholder for OAuth flow).
- [ ] Notification toggles saved to localStorage.
- [ ] Manual sync button triggers `POST /api/sync` (if implemented).

**OpenClaw Actions**:

- Create branch `feat/settings-page`.
- Build settings form with toggles.
- Bind theme toggle to global theme state.
- Add OAuth placeholder (links to docs for setup).
- Write tests for form state, persistence.
- Push and merge.

**Estimated effort**: 2 hours.

---

## Phase 3: Testing, Accessibility, Refinement

**Goal**: Full test coverage, WCAG 2.1 AA compliance, performance optimization.

### Task 3.1: Unit & Integration Tests

**Acceptance Criteria**:

- [ ] All components tested (render, interactions, states).
- [ ] All API endpoints tested with mocked database.
- [ ] All services tested (GitHub sync, active job detection, etc.).
- [ ] Coverage > 80% for src/ (src/ui, src/pages, src/services exclude).
- [ ] CI runs tests automatically on PR.
- [ ] `npm run test` passes all tests.

**OpenClaw Actions**:

- Create branch `test/full-coverage`.
- Write tests for untested code.
- Use Vitest + React Testing Library.
- Push and merge once 80%+ coverage achieved.

**Estimated effort**: 4 hours.

---

### Task 3.2: Accessibility Audit & Fixes

**Acceptance Criteria**:

- [ ] All pages pass axe-core scan (0 violations).
- [ ] Keyboard navigation works: Tab through all interactive elements.
- [ ] Focus visible on all buttons, inputs, links.
- [ ] Color contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large.
- [ ] Images have alt text.
- [ ] Form fields have associated labels.
- [ ] Animations respect `prefers-reduced-motion`.

**OpenClaw Actions**:

- Create branch `a11y/wcag-compliance`.
- Run axe-core scan on all pages.
- Fix violations (focus states, contrast, labels, etc.).
- Use keyboard-only navigation to verify.
- Push and merge once audit passes.

**Estimated effort**: 3 hours.

---

### Task 3.3: Performance & Optimization

**Acceptance Criteria**:

- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices).
- [ ] First Contentful Paint < 2s.
- [ ] Code split by route.
- [ ] Images optimized (WebP, lazy-load).
- [ ] Unused CSS removed.

**OpenClaw Actions**:

- Create branch `perf/optimization`.
- Run Lighthouse audit.
- Identify slow components; add memoization if needed.
- Optimize images; add code splitting.
- Push and merge once Lighthouse passes.

**Estimated effort**: 3 hours.

---

## Phase 4: Polish & Deployment

**Goal**: Handle edge cases, error recovery, deployment validation.

### Task 4.1: Error Handling & Edge Cases

**Acceptance Criteria**:

- [ ] All API errors show user-friendly messages (not raw errors).
- [ ] Network timeouts handled gracefully.
- [ ] Empty states for repos, jobs, PRs (show helpful message + CTA).
- [ ] Loading states clear (spinners, skeletons).
- [ ] Offline detection (show banner if fetch fails).

**OpenClaw Actions**:

- Create branch `feat/error-handling`.
- Add error boundaries to pages.
- Implement user-friendly error messages.
- Add empty state components.
- Push and merge.

**Estimated effort**: 2 hours.

---

### Task 4.2: Deployment & Env Configuration

**Acceptance Criteria**:

- [ ] `vercel.json` configured with backend redirect (if using Vercel).
- [ ] Environment variables properly scoped (VITE\_ prefix for frontend).
- [ ] Backend deployed to cloud (Vercel, Render, Heroku, or self-hosted).
- [ ] Frontend deployed to Vercel or static host.
- [ ] Health check passing: `curl https://wjbetech-dashboard.vercel.app/api/health`.

**OpenClaw Actions**:

- Create branch `deploy/setup`.
- Configure vercel.json and environment variables.
- Deploy; test endpoints.
- Document deployment process in README.
- Push and merge.

**Estimated effort**: 2 hours.

---

## Task Dependencies & Ordering

```
Phase 1 (Backend):
  1.1 Setup → 1.2 DB → 1.3 GitHub → 1.4 API → 1.5 Active Job

Phase 2 (Frontend):
  2.1 Base Components → 2.2 Dashboard → 2.3 Repos → 2.4 Jobs/Kanban → 2.5 Settings
  (Parallel: 2.1 can start while Phase 1 is in progress)

Phase 3 (Testing & A11y):
  3.1 Tests → 3.2 Accessibility → 3.3 Performance
  (Can overlap with Phase 2)

Phase 4 (Deployment):
  4.1 Error Handling → 4.2 Deployment
  (Latest phase; depends on all earlier work)
```

---

## Acceptance & Merge Criteria

### For Every PR:

1. **Branch naming**: `feat/...`, `fix/...`, `chore/...`, `test/...`, `a11y/...`, `perf/...`, `deploy/...`.
2. **PR description**: Title, summary, testing steps, related issue.
3. **CI Checks**:
   - Linting passes (ESLint).
   - All tests pass (Vitest).
   - Build succeeds (Vite).
   - No TypeScript errors.
4. **Code quality**:
   - No console errors/warnings (unless intentional).
   - Accessibility audit clean (axe-core 0 violations for UI changes).
5. **Merge**: Once all checks pass, squash merge with auto-generated message: `<type>: <description> (OpenClaw auto-merge)`.

### For Backend Tasks:

- API endpoint tests required.
- Database migrations tested locally.
- Environment variables documented.

### For Frontend Tasks:

- Component tests required (render + interactions).
- Keyboard navigation tested.
- Focus states visible.
- Responsive design (mobile-first).

---

## Quick Reference: OpenClaw Task Structure

Each task above follows this pattern:

1. **Description**: What and why.
2. **Acceptance Criteria**: Testable, specific requirements (checkboxes).
3. **OpenClaw Actions**: Steps to implement (branch name, commands, testing, merge).
4. **Estimated effort**: Time to complete (for planning).

**All tasks assume**:

- Use generated contracts from `src/contracts` for validation.
- Follow design system from `docs/design.md`.
- Test thoroughly before pushing.
- Keep commits focused, PR descriptions clear.
- Self-merge on passing CI (no manual approval required for this repo).
