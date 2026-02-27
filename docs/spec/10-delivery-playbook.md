Delivery Playbook — Implementation Plan and Sprints

Overarching approach
- Iterative delivery in 2-week sprints. Each sprint ends with a working demo deployed to staging.
- Use GitHub projects or issues to track tasks; PR-based workflow with feature branches.

Sprint 0 — Foundations (1 week)
- Initialize repo scaffold (Vite + React + TypeScript + Tailwind + shadcn)
- Add design tokens and Tailwind config
- Setup Prisma + Postgres schema + migrations
- Add basic auth with GitHub OAuth (mocked for dev)
- Storybook setup and initial Button/Card components
- CI: lint, typecheck

Sprint 1 — Core Dashboard & Data Models (2 weeks)
- Implement backend API skeleton (Fastify/Express) with auth
- Implement repo sync worker (mocked) and /api/repos endpoints
- Dashboard UI: Repo list, Repo card, CI status placeholder
- Database migrations and seed data
- Tests: unit + integration for API

Sprint 2 — Jobs Feed & ATS MVP (2 weeks)
- Job import endpoint (CSV) + sample parser
- Jobs feed UI with filters and save action
- Applications CRUD + simple ATS UI
- Resume upload (local dev storage) + preview
- E2E tests for apply flow

Sprint 3 — GitHub integration & Webhooks (2 weeks)
- Full GitHub sync with GraphQL for batched data
- Webhook receiver and event handlers for issues/PRs
- Link issues to applications feature
- Notifications (in-app)

Sprint 4 — Design polish & search (2 weeks)
- Finish design system components and Storybook coverage
- Global search implementation with Postgres FTS
- Accessibility fixes and Lighthouse improvements

Sprint 5 — Staging hardening & launch prep (2 weeks)
- CI/CD setup for staging and production, migrations automation
- Security review and privacy docs finalization
- Onboarding flows and help docs
- Beta release to invited users

Task breakdown & estimates
- Provide templated issue format with: summary, acceptance criteria, estimate (hours), owner
- Break large features into ~1–3 day tasks for clarity

Deliverables per sprint
- Deployed staging build
- Working demo recording and checklist showing acceptance criteria pass
- PRs merged with tests green

Rollout
- Invite-only beta → public beta → open release
- Collect feedback via in-app survey and iterate

Ongoing ops
- Weekly syncs for backlog grooming
- Monthly security checkups and dependency updates

Next immediate steps (today)
1. Update spec files (done)
2. Create initial issues in repo for Sprint 0 tasks
3. Start Sprint 0: scaffold + design tokens + auth mock


