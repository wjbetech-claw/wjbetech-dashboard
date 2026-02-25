# UI Component Inventory

This list defines the UI pieces and states to implement so the app can be built without further UX decisions.

## Layout
- **PageLayout**: Navbar + Sidebar + main content area.
- **Sidebar**: nav list, active state, quick actions.
- **Navbar**: app title, Board/Jobs links, ThemeSwitcher.

## Dashboard
- **Hero**: welcome title, quick actions.
- **Summary Cards**: health, deployments, focus.
- **OverviewStats** grid.
- **PipelineOverview** list with progress bars.
- **RecentActivity** timeline list.
- **EnvironmentsGrid** summary cards.
- **AlertsPanel** list with severity chips.

## Board (Kanban)
- Columns with color background + icon.
- Card drag & drop, move controls.
- Add Task modal (title, description, column select).
- Delete icon per card.

## Jobs
- KPI cards (open/saved/applied).
- Job list table with status chips.
- Job discovery cards with CTA.

## Repos
- Repos table (status, PRs, workflows).
- Recent PR list with CTA.

## Settings
- Integrations list with status chips.
- Notifications cards with toggles/CTA.

## Empty states & errors
- Empty list placeholders for jobs/repos/alerts.
- Inline error banners.
