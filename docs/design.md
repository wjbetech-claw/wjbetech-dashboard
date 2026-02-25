# Design System & UI Guidelines

This document defines the complete design system for the wjbetech-dashboard: tokenized design, color palettes, typography, spacing, elevation, component patterns, accessibility standards, and theme switching. It provides all visual decisions and implementation patterns so development can proceed without UX ambiguity.

## Design Principles

- **Sleek, minimal, professional, and neutral**: No decorative elements. Clean lines, ample whitespace, functional-first.
- **Tokenized**: All visual decisions stored as tokens (colors, spacing, radii, type) so themes can be swapped programmatically.
- **Accessibility-first**:
  - WCAG 2.1 AA compliance: color contrast (4.5:1 normal text, 3:1 large text).
  - Keyboard navigation: all interactive elements reachable via Tab without mouse.
  - Focus visible: clear focus indicators (outline, ring, or color change).
  - Reduced motion: respect `prefers-reduced-motion` media query; remove animations.
  - Screen reader friendly: semantic HTML, ARIA labels where needed, skip links.
- **Dark + Light themes**: Both driven from the same token set; CSS variables on `html[data-theme]`.

## Color System

### Token Naming & Values

**Light Theme** (default)

- `--color-bg`: #ffffff (page background)
- `--color-panel`: #ffffff (card/section background)
- `--color-text`: #0f172a (primary text)
- `--color-text-muted`: #6b7280 (secondary/legend text)
- `--color-border`: #e6e9ef (dividers, borders)
- `--color-primary-500`: #6366f1 (buttons, links, accents)
- `--color-success`: #10b981 (positive status, checks)
- `--color-warning`: #f59e0b (caution, pending)
- `--color-error`: #ef4444 (destructive, failures)
- `--color-info`: #3b82f6 (informational)
- `--color-backdrop`: rgba(0,0,0,0.4) (modal overlay)

**Dark Theme** (via `html[data-theme="dark"]`)

- `--color-bg`: #0b1220 (page background)
- `--color-panel`: #0f1724 (card/section background)
- `--color-text`: #e6eef8 (primary text)
- `--color-text-muted`: #9ca3af (secondary/legend text)
- `--color-border`: #1f2937 (dividers, borders)
- `--color-primary-500`: #6366f1 (same across themes for brand consistency)
- `--color-success`: #10b981
- `--color-warning`: #f59e0b
- `--color-error`: #ef4444
- `--color-info`: #3b82f6
- `--color-backdrop`: rgba(0,0,0,0.7)

### Contrast & Accessibility

- **Normal text**: always 4.5:1 or higher.
- **Large text** (18px+): 3:1 or higher.
- **Interactive**, **focus states**: inherit text contrast plus visible outline (min 2px).
- **Disabled state**: reduce opacity to 60% and use muted color.

## Typography

### Font Family & Loading

- **Primary font**: Inter variable (already loaded via Google Fonts in index.html).
- **Font weights used**: 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold).
- **Fallback stack**: `Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`.

### Type Scale

Base font-size: 16px (1rem). All sizes use rem units.

- **H1**: font-size: 2rem (32px), font-weight: 700, line-height: 1.2
- **H2**: font-size: 1.5rem (24px), font-weight: 700, line-height: 1.3
- **H3**: font-size: 1.25rem (20px), font-weight: 600, line-height: 1.4
- **H4**: font-size: 1.125rem (18px), font-weight: 600, line-height: 1.4
- **Body Large**: font-size: 1rem (16px), font-weight: 400, line-height: 1.5
- **Body**: font-size: 0.875rem (14px), font-weight: 400, line-height: 1.5
- **Body Small**: font-size: 0.75rem (12px), font-weight: 400, line-height: 1.5
- **Caption**: font-size: 0.625rem (10px), font-weight: 600, line-height: 1.4, all-caps, letter-spacing: 0.05em

### Line Height & Spacing

- Headings: 1.2–1.4 (tight for visual hierarchy).
- Body text: 1.5 (readable, accessible).
- Paragraph margins: bottom margin = 1rem.

## Spacing System

4px base unit. All spacing uses multiples of 4.

- **xs**: 4px (margin/padding on small UI)
- **sm**: 8px (default padding inside buttons, small gaps)
- **md**: 12px (standard vertical padding, gaps in lists)
- **lg**: 16px (standard padding, section margins)
- **xl**: 20px (large gaps, hero sections)
- **2xl**: 32px (major section spacing)
- **3xl**: 48px (page-level spacing)

### Application Rules

- Buttons: padding `sm lg` (8px horizontal, 12px vertical).
- Cards: padding `lg` (16px all around).
- List items: padding `md` (12px block/inline).
- Section gap: margin-bottom `lg` or `xl`.
- Sidebar/Navbar: padding `md` for items, `lg` for sections.

## Border Radius & Elevation

### Radii

- **xs**: 4px (small buttons, inputs)
- **sm**: 6px (cards, panels, small modals)
- **md**: 10px (standard cards, dropdowns)
- **lg**: 16px (large cards, drawer edges, hero sections)
- **full**: 999px (pills, circular badges)

All interactive elements receive focus outline-offset of 2–4px for keyboard nav visibility.

### Elevation / Shadows

- **subtle**: `0 1px 2px rgba(16,24,40,0.04)` (cards at rest, dividers)
- **base**: `0 4px 6px rgba(16,24,40,0.08)` (hovered cards, dropdowns)
- **medium**: `0 10px 15px rgba(16,24,40,0.12)` (modal dialogs)
- **strong**: `0 20px 25px rgba(16,24,40,0.15)` (floating action, tooltips)
- **Dark theme adjustments**: increase opacity of shadow color to 0.2–0.4 for visibility.

## Component Patterns

### Button

```tsx
// Primary
<button className="px-lg py-md bg-primary-500 text-white rounded-sm hover:bg-[#5558dd] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary-500 active:bg-[#4c4fc4]">
  Action
</button>

// Secondary (outline)
<button className="px-lg py-md border border-border text-text rounded-sm hover:bg-panel focus:outline focus:outline-2 focus:outline-primary-500 transition-colors">
  Cancel
</button>

// Size: sm = px-sm py-xs, lg = px-xl py-lg
// Disabled: opacity-60 cursor-not-allowed
```

**States**:

- **Rest**: background color, no outline.
- **Hover**: slightly darker/lighter shade, shadow subtle.
- **Focus**: visible outline (2px, 2–4px offset).
- **Active/Pressed**: darker shade, no shadow.
- **Disabled**: opacity 60%, cursor not-allowed, no interactions.

### Card / Panel

```tsx
<div className="bg-panel border border-border rounded-md shadow-subtle p-lg">
  <h3>Title</h3>
  <p>Content…</p>
</div>
```

- Padding: `lg` (16px).
- Border: `1px solid var(--color-border)`.
- Shadow: `subtle`.
- Radius: `md` (10px).
- on-hover optional shadow: lift to `base`.

### Input & Form Control

```tsx
<input
  className="w-full px-md py-sm border border-border rounded-sm text-text bg-panel focus:outline focus:outline-2 focus:outline-primary-500"
  type="text"
  placeholder="…"
/>
```

- Padding: `md` (12px).
- Border: `1px solid var(--color-border)`, darken on focus.
- Radius: `sm` (6px).
- Focus: outline `primary-500` (2px, no offset needed).
- Disabled: opacity 60%, background `muted`.

### Badge / Chip / Status

```tsx
<span className="px-sm py-xs bg-blue-100 text-blue-900 rounded-full text-caption font-600">Pending</span>
```

- Role: inline label for status, skill, or category.
- Background: semantic color (success/warning/error/info) at 10–20% opacity.
- Text: corresponding dark semantic color (900/800 in light, lighter in dark theme).
- Padding: `xs md` (4px 12px).
- Radius: `full` (999px).

### Navbar & Sidebar

**Navbar**:

- Height: 56px (4rem).
- Padding: `md` horizontally, centered vertically.
- Background: `--color-bg`.
- Border-bottom: `1px solid var(--color-border)`.
- Items: flex row, gap `lg`.
- Logo: font-size `h4`, font-weight 700.
- Nav links: body text, underline on active, hover color shift.

**Sidebar**:

- Width: 240px (fixed or collapsible).
- Padding: `md`.
- Background: `--color-panel`.
- Border-right: `1px solid var(--color-border)`.
- Items: flex column, gap `md`.
- Active item: background `primary-500` at 10%, left border `primary-500` (4px), font-weight 500.
- Icons: margin-right `sm`, always paired with text.

### Modal / Dialog

```tsx
<div className="fixed inset-0 bg-backdrop flex items-center justify-center">
  <div className="bg-panel rounded-lg shadow-medium p-lg max-w-xl">{/* content */}</div>
</div>
```

- Backdrop: `var(--color-backdrop)`, click-outside to close.
- Dialog: max-width `xl` (512px), shadow `medium`.
- Padding: `lg`.
- Close button: top-right, size `md`, icon or "×".

### Table / Data Grid

```tsx
<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-panel">
      <th className="text-left p-md text-caption font-600 text-muted">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-panel transition-colors">
      <td className="p-md text-body">Cell</td>
    </tr>
  </tbody>
</table>
```

- Row height: 44px (min, for touch targets).
- Border: `1px solid var(--color-border)`.
- Hover row: shift background slightly, no motion if `prefers-reduced-motion`.
- Sticky header if scrollable.

### List Item

```tsx
<li className="px-md py-lg border-b border-border hover:bg-panel transition-colors flex justify-between items-center">
  <span>Item</span>
  <button>Action</button>
</li>
```

- Padding: `md` horizontal, `lg` vertical.
- Border-bottom: `1px solid var(--color-border)`.
- Hover: subtle background shift.
- Icon + Text: flex row, gap `sm`, align center.

## Animations & Motion

- **Default duration**: 200ms for focus, 300ms for transitions.
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (Tailwind `ease-in-out`).
- **Disabled**: Respect `prefers-reduced-motion` by removing all animations; use instant color changes.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Theme Implementation

### CSS Custom Properties (Root)

Place all tokens on `:root` for light and `html[data-theme="dark"]` for dark.

```css
:root {
  --color-bg: #ffffff;
  --color-text: #0f172a;
  /* ... all light theme tokens */
}

html[data-theme="dark"] {
  --color-bg: #0b1220;
  --color-text: #e6eef8;
  /* ... all dark theme tokens */
}
```

Stored in `src/styles/tokens.css`.

### Theme Persistence

- Store preference in `localStorage` with key `theme-preference`.
- On page load, check localStorage, respect `prefers-color-scheme` media query as fallback.
- ThemeSwitcher component: toggle button on navbar, updates `html[data-theme]` and localStorage.

## Implementation Checklist for OpenClaw

- [ ] Review `src/styles/tokens.css` and `design/tokens.json`; keep them in sync.
- [ ] All new component files under `src/ui/` should import and use `var(--color-*)` and `var(--spacing-*)`.
- [ ] Use Tailwind classes where sensible (grid, flex, margin, padding) + CSS custom properties for colors.
- [ ] Add focus outlines to all buttons, links, inputs (test with Tab key).
- [ ] Test color contrast: use WAVE or axe DevTools; ensure 4.5:1 for normal text.
- [ ] Test in dark theme both programmatically (set `data-theme="dark"`) and user preference.
- [ ] Verify reduced-motion behavior: set OS accessibility → motion → reduce; confirm no jank.
- [ ] All interactive elements must be keyboard reachable (Tab order, Enter/Space to activate).
- [ ] Use semantic HTML: `<button>` not `<div>`, `<nav>`, `<main>`, `<article>` as appropriate.
- [ ] Lint accessibility: `eslint-plugin-jsx-a11y` in ESLint config (if not present, add it).

## References

- [WCAG 2.1 Overview](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Radix Primitives](https://www.radix-ui.com/)
- [Inter Font](https://rsms.me/inter/)
