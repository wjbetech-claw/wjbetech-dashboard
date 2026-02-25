# Design System & UI Guidelines

This document defines the design system for the wjbetech-dashboard: tokenized design, color palettes, typography, spacing, elevation, theme switching, and component guidelines (shadcn/Radix patterns). It's intentionally pragmatic — focused on implementation.

Principles
- Sleek, minimal, professional, and neutral.
- Tokenized: all visual decisions are stored as tokens (colors, spacing, radii, type) so themes can be swapped programmatically.
- Accessibility-first: color contrast, keyboard focus, and reduced-motion support.
- Dark + Light themes driven from the same tokens with CSS custom properties.

Token Catalog (summary)
- Colors: neutral gray scale + primary (indigo-teal mix) + success/warn/error + surface/backdrop
- Type: Inter variable, scale for H1..H6, body-lg/body-md/body-sm, caption
- Spacing: scale of 4px steps (xs..xl)
- Radii: small/medium/large
- Elevation/shadows: 0..4 subtle steps

Component priorities
1. Dashboard Overview: Active Job card + Job Listings
2. Kanban Jobs board

Component inventory (detailed)
- See docs/ui/components.md for full list and states.
- See docs/ui/flows.md for UX flows.

Typography
- Font: Inter (variable) for UI and body copy.
- Base font-size: 16px; scale using rem tokens.

Themes
- Implement themes with CSS custom properties on `html[data-theme="light"]` and `html[data-theme="dark"]`.
- Provide a ThemeSwitcher component to toggle and persist preference.

Implementation notes
- Tailwind integrates with design tokens via CSS variables — tokens live in `design/tokens.json` and `src/styles/tokens.css`.
- Use Radix primitives + shadcn patterns for accessible components.

Files to add in repo
- design/tokens.json — canonical token values
- src/styles/tokens.css — CSS custom properties and theme mapping
- src/ui/button.tsx — example Button component using tokens
- docs/design.md — this file

