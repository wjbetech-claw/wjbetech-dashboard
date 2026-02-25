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
