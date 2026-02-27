# wjbetech-dashboard — Product Roadmap

---

# PHASE 0 — Product & Design Foundations

- [ ] Define design tokens (colors, spacing, radius, shadows, typography scale)
- [ ] Implement theme system (light default, future dark support)
- [ ] Create surface elevation system (bg-level-1/2/3 pattern)
- [ ] Establish layout grid (responsive max-width container, sidebar width, content padding)
- [ ] Add motion baseline (150–250ms transitions, easing standard)
- [ ] Implement global loading + skeleton strategy
- [ ] Implement global empty state component
- [ ] Implement toast/notification system

---

# PHASE 1 — Backend Core (Structured & Scalable)

- [ ] Backend project scaffold (Express + TS + folder architecture)
- [ ] Central config + env validation (zod-based)
- [ ] Postgres schema v1 (repos, pulls, workflows, jobs, activity)
- [ ] DB access layer (typed query wrappers)
- [ ] Logging system (structured logs)
- [ ] Error normalization middleware
- [ ] Health endpoint + version endpoint
- [ ] API response standardization (success/error envelope)

---

# PHASE 2 — GitHub Integration & Intelligence

- [ ] Octokit service wrapper (rate-limit aware)
- [ ] Repo sync worker (cron)
- [ ] Pull request ingestion
- [ ] Workflow run ingestion
- [ ] Activity aggregation service
- [ ] Active job scoring algorithm
- [ ] Caching strategy (in-memory or Redis-ready abstraction)

---

# PHASE 3 — Frontend System Architecture

- [ ] Base layout shell (Sidebar + TopNav + Content frame)
- [ ] Sidebar with collapsible behavior
- [ ] Command palette (⌘K style quick navigation)
- [ ] Global search UI
- [ ] Route structure refactor (clean URL hierarchy)

---

# PHASE 4 — Design System Components (Modern & Cohesive)

- [ ] Button variants (primary, subtle, ghost, danger)
- [ ] Card with elevation levels
- [ ] Badge (status-based color system)
- [ ] Table (dense + comfortable modes)
- [ ] DataList component (Atlassian-style)
- [ ] Tabs component
- [ ] Modal + slide-over panel
- [ ] Dropdown & contextual menu
- [ ] Avatar + stacked avatar group
- [ ] Tooltip system
- [ ] Progress indicators (linear + circular)
- [ ] Skeleton loaders for all major data surfaces

---

# PHASE 5 — Dashboard Experience (Atlassian-Level Polish)

- [ ] Overview page redesign (modular widgets grid)
- [ ] Active Job hero card (highlighted surface)
- [ ] Recent commits activity feed (timeline style)
- [ ] Pull request summary card
- [ ] CI status summary card
- [ ] Quick actions panel
- [ ] Color-accented metric cards (subtle but vibrant)
- [ ] Micro-interactions on hover states
- [ ] Animated counters for metrics

---

# PHASE 6 — Repositories & Workflows

- [ ] Repo table with sorting + filtering
- [ ] Status chips with semantic colors
- [ ] Expandable row details
- [ ] Workflow status visualization
- [ ] Last build result indicator
- [ ] Activity sparkline charts

---

# PHASE 7 — Jobs & Kanban (Product Feel)

- [ ] Drag-and-drop board (smooth animation)
- [ ] Persisted board state
- [ ] Inline editing of cards
- [ ] Status-based color tagging
- [ ] Swimlanes (optional advanced mode)
- [ ] Keyboard accessibility for board

---

# PHASE 8 — Interaction & UX Polish

- [ ] Page transition animations
- [ ] Optimistic UI updates
- [ ] Refined loading states (no layout shift)
- [ ] Contextual empty states
- [ ] Keyboard shortcuts (navigation + quick actions)
- [ ] Subtle elevation + hover shadow system

---

# PHASE 9 — Accessibility & Quality

- [ ] Axe-core 0 violations
- [ ] Color contrast compliance
- [ ] Focus ring system
- [ ] Unit tests (>80%)
- [ ] Integration tests
- [ ] Performance budget enforcement
- [ ] Lighthouse >90

---

# PHASE 10 — Deployment & Production

- [ ] Production env configuration
- [ ] Secure GitHub token handling
- [ ] CI multi-job workflow
- [ ] Error boundary UI
- [ ] Observability (basic metrics/log hooks)
