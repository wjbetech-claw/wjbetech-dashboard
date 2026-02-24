# Architecture

This document describes the high-level architecture and integration points for the wjbetech Dashboard. It is intentionally diagram-free and focuses on components, data flows, responsibilities, and design decisions so the app can be implemented and iterated on.

Goals
- Provide a single, developer-focused dashboard that aggregates GitHub workflow and CI status, surfaces relevant job listings from public boards (LinkedIn, Indeed), and offers an internal Kanban-style job board.
- Show an automatically-determined "active job" based on recent developer activity and assistant signals.
- Keep integrations optional and the core app usable without external services (self-hosted Kanban is first-class).

- Show recent commits across the user's projects (across wjbetech and wjbetech-claw accounts), with links to the commits and repositories.
- Provide quick links to the user's projects and repos for fast navigation.
- Display Vercel (and other host) deployment status for applications the user owns or monitors.
- Aggregate any other development-status signals (open PRs, failing tests, pending reviews) to give a single-pane status view across organizations.


Core Components

1. Frontend (React + Vite)
- Single-page application.
- Pages / panels:
  - Overview / Front Dashboard: workflow health, CI badges, active job, job listings.
  - Jobs: internal Kanban board, job details, apply/bookmark flows.
  - Repositories: per-repo views of Actions/workflows, recent PRs, and issue lists.
  - Settings: manage integrations and credentials.
- Data fetching via a small backend API (see Backend) or direct read-only calls where appropriate (GitHub public API).

2. Backend API (Node/TypeScript)
- Responsibilities:
  - Aggregate and normalize data from integrations.
  - Provide a secure API for the frontend (REST or GraphQL).
  - Run background workers for scraping and sync tasks.
  - Manage authentication, caching, rate-limit handling, and feature flags.
- Implementation notes:
  - Lightweight Express / Fastify / NestJS service is appropriate.
  - Store secrets (API keys, tokens) in environment or a secrets store (Vercel/GitHub Secrets/HashiCorp Vault for self-hosted).

3. Data and Storage
- Primary storage for app metadata, user preferences, saved jobs, and Kanban items:
  - Small relational DB (Postgres) or SQLite for lightweight deployments.
- Caching and transient storage:
  - Redis (optional) for caching GitHub responses, scraping results, and rate-limit backoff state.
- Long-term logs and analytics:
  - Optional: external analytics service or simple event store in DB.

4. Integrations
- GitHub (required)
  - Use the GitHub REST API to fetch repositories, PRs, issues, and Actions workflow runs.
  - Prefer a read-only token with minimal scopes for server-side aggregation.
  - Optionally use a GitHub App for richer webhook-based updates (recommended for production).
- Job Listings (LinkedIn, Indeed, etc.)
  - Public job boards often do not provide free APIs for scraping; implement a configurable scraping worker or use third-party aggregator APIs.
  - Scraper/runtime considerations:
    - Respect robots.txt and terms-of-service (TOS) for each site. If scraping is disallowed, prefer third-party APIs or official feeds.
    - Rate-limit scraping and cache results to avoid repeated requests.
    - Normalize job listings into a local schema (title, company, location, url, salary, postedAt, remoteFlag, tags).
- Jira (optional)
  - Support as an optional integration to show tickets; however the app includes a built-in Kanban board so Jira is not required.
  - If Jira is connected, map Jira issues → internal Kanban items and allow two-way sync if desired.

5. Active Job Determination
- Hybrid automated approach (recommended):
  - Primary signal: recent code activity across monitored repos — the most recently opened/updated PR or the branch most recently pushed to by the developer.
  - Secondary signals: TODO assignments, issues assigned to the user, or a job marked in the internal Kanban.
  - Assistant signal: the assistant (agent persona) can set the active job when it begins working on a task or when the user tells it what they’re working on. The assistant may also suggest an active job and request confirmation.
- UX expectations:
  - Show the active job prominently on the front dashboard with a timestamp and source signal (e.g., "Active job (auto): Fix PR #42" or "Active job (manual): Design landing header").
  - Provide a one-click control to accept or override the active job.

6. Background Workers & Scheduling
- Scrapers and sync jobs should run in background workers on a schedule (cron-like) or via event triggers (webhooks).
- Worker responsibilities:
  - Periodically sync GitHub workflow runs and PR status.
  - Poll or scrape job boards on a sane interval (e.g., hourly) and update cache.
  - Reconcile Jira (if connected) and push updates to internal Kanban if two-way sync enabled.

7. Security & Privacy
- Do not collect personal data unnecessarily. For job scraping, store only public job metadata and the original URL.
- Store API tokens securely (environment variables or secret manager). Rotate tokens regularly.
- Enforce least-privilege when requesting scopes for GitHub tokens.
- Provide user-facing privacy notes explaining data collection and scraping behavior.

8. Deployment & Scaling
- Small deployments: serverless functions (Vercel) + managed Postgres (e.g., Supabase) + optionally Redis via managed service.
- Larger deployments: a Node app behind a load balancer, containerized workers, and separate worker fleets for scraping.
- Monitor background task health and provide retry/backoff for scraping failures.

9. Observability & Monitoring
- Capture build/worker errors in Sentry or similar.
- Provide internal endpoint for health checks and worker status.
- Expose dashboard-level metrics: number of repos monitored, last sync time, job-scrape success rate.

Implementation Roadmap (minimal viable)
1. MVP backend: small API that reads GitHub repos and PRs, stores minimal state, and serves frontend.
2. Frontend dashboard: show repo list, recent PRs, Actions status, and an internal Kanban (no external scraping yet).
3. Active job auto-detection: implement basic signal from latest PR/commit activity.
4. Job scraping worker: add a configurable scraper adapter for LinkedIn/Indeed (start with a mock or third-party aggregator API to respect TOS).
5. Optional integrations: add Jira connector and two-way sync if needed.

Notes and constraints
- Respect each site's terms when scraping. Prefer official APIs or third-party data providers when possible.
- Provide feature flags to disable scraping per team or deployment.
- Keep the built-in Kanban usable offline of third-party services so teams can adopt without external integrations.

