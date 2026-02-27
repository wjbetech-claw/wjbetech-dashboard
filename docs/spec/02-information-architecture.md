Information Architecture

Primary user flows
- Onboard: connect GitHub, optionally import resume, configure job sources
- Daily review: open dashboard, scan repo health, open prioritized issues, check application statuses
- Apply flow: find job → save → apply → mark status → schedule interview
- Project management: create/update issue, link issue to application (optional), comment and follow up

Top-level routes (React + React Router)
- / — Dashboard (global view)
- /repos — Repositories index
- /repos/:owner/:repo — Repository view (issues, PRs, CI, insights)
- /jobs — Job feed (aggregated)
- /jobs/:id — Job detail (apply button, company, role, tags)
- /applications — Personal ATS (list + filters)
- /applications/:id — Application detail (notes, timeline)
- /settings — Account and integrations
- /help — Documentation and onboarding

Navigation model
- Left rail: collapsible sidebar with primary sections (Dashboard, Repos, Jobs, Applications, Search, Settings)
- Top bar: global search, quick actions, user menu
- Contextual actions: inside repo view or application view, show right-hand drawer with details

Search & filters
- Global search: fuzzy search across repos, issues, jobs, applications
- Filters: repo language, repo activity (last commit), job location, job remote, job type, application status

Data freshness
- GitHub data: cached with a 5–15 minute TTL, on-demand refresh for specific repo
- Job feeds: refresh every 30 minutes (or on-demand import)

Permissions model
- Individual users only (initial); later team/org model with role-based access

Integration points
- GitHub API: repo metadata, issues, PRs, checks, webhooks (optional)
- Job sources: GitHub Jobs mirror/aggregator, Lever/Greenhouse public feeds or scraping (respect robots.txt and TOS), CSV import
- Auth: GitHub OAuth (primary)

Notifications
- In-app notifications for CI failures, application status changes (manual updates or scrapers if available), and scheduled reminders
- Optional email notifications (via transactional email provider like SendGrid, only if user opts in)


