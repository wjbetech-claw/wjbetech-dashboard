UI Patterns — Behavior and Examples

Cards and Density
- Use compact cards similar to Atlassian: 12–16px internal padding, subtle border, hover elevation
- Card header: title (left), meta (right), optional menu (Ellipsis)

Lists and Tables
- Lists: use stacked cards for most lists (issues, jobs)
- Tables: reserved for data-dense views (applications list, repo metrics)
- Provide column sorting, column hide/show, and lightweight column filtering

Filters & Facets
- Left-side filters for long lists; top-bar filters for quick toggles
- Use pill tokens to show active filters with clear actions to remove

Kanban & Boards
- Draggable lanes with lazy-loading columns; persist order and states in DB
- Cards show minimal metadata; expand to drawer for details

Modals & Drawers
- Use drawers for contextual detail (right-side) and modals for destructive actions or flows that must block

Inline editing
- For small fields like status, priority, tag selection — use inline edit primitives with optimistic updates

Empty states
- Provide actionable empty states with primary CTA (e.g., "Connect GitHub" or "Import jobs CSV")

Error & Loading states
- Use skeletons for lists and cards; inline error banners for localized errors; global toasts for system messages

Responsive behavior
- Desktop: full sidebar and multi-column layouts
- Tablet: collapsible sidebar and single-column content stacks
- Mobile: minimal view with primary actions accessible via FAB (floating action button)

Micro-interactions
- Subtle hover transitions (150ms ease), responsive focus rings, confirmation toasts

Examples
- Repo list item: avatar (owner/org), repo name, primary language, last commit relative time, open issues count, CI status badge
- Application card: company logo, role, location, status pill, applied date, next step reminder


