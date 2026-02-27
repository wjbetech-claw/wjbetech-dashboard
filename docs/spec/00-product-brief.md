Product brief — WJBetech Dashboard + Job Hunting

TL;DR
A modern, developer-focused dashboard that combines GitHub project insights with job-hunting tools tailored to software engineers. The product surfaces repository health, CI status, issue workflows, and personalized job feeds (GitHub, Lever, Greenhouse) with lightweight ATS features (apply-tracking, resume snapshots, interview timeline). The goal: provide a single place for engineering project management and career operations.

Who for
- Individual contributors and small engineering teams (1–50) who want an integrated view of project health and job opportunities.
- Developers actively looking or passively open to opportunities who want to manage applications alongside work.

Core problems solved
- Context switching between GitHub, job sites, and spreadsheets.
- Tracking job applications alongside ongoing project work.
- Quickly surfacing repository issues and PRs needing attention.

Primary value props
- Unified dashboard linking code, issues, CI, and job applications.
- Smart filters and suggestions: matching job roles to repo skills, auto-linking companies with GitHub orgs.
- Lightweight ATS for personal use: track applications, store resume versions, schedule follow-ups.

Non-goals (initial)
- Not a full hiring ATS for teams (no interviewer orchestration, offer management).
- Not a replacement for full-featured job boards; focuses on aggregation and personal tracking.

Success metrics
- DAU/WAU for active developers (initial target 100 users within 60 days).
- Time-to-apply reduction metric (average: decrease by 30% vs baseline workflow).
- Retention of users who save >3 applications in 30 days.

Constraints
- Use free-tier-friendly services only (Supabase/Neon/Postgres free, Vercel free, Typesense OSS or Postgres FTS for search).
- Privacy-first: user data stored encrypted at rest; no selling of data.

Launch plan (MVP)
- Core dashboard: repo list, key metrics, issue/PR list, CI status badges.
- Job feed: aggregated jobs from GitHub Jobs (or GitHub Jobs mirror), Lever/Greenhouse scrapers where permitted, CSV import.
- Personal ATS: track status (Applied, Phone Screen, Interview, Offer, Rejected), notes, resume uploads.
- OAuth with GitHub and optional email login.

Roadmap (high level)
- v1: Dashboard + Job feed + ATS (MVP)
- v2: Smart matching & suggestions, resume parsing, integrated calendar invites
- v3: Team features, interview scorecards, company analytics


