Design System — Tokens, Components, and Guidelines

Goals
- Create an Atlassian-like professional system: compact, clear hierarchy, generous spacing, and a distinctive color voice (pastel red/gold in light, navy/forest-green accents in dark).
- Make components composable, accessible, themeable (light/dark), and ready for use in shadcn/Radix and Tailwind.
- Provide tokens that map to Tailwind design tokens and a Figma-ready spec.

Foundations (tokens)
- Color tokens: semantic-first (surface, background, text, muted, border, interactive, focus, success, warning, danger) and accent tokens (accent-1..accent-6) for expressive uses.
- Typography: Inter as the primary UI font (variable Inter where possible). Sizes: xs (12px), sm (14px), base (16px), md (18px), lg (20px), xl (24px). Weights: 400 (regular), 500 (medium), 700 (bold). Line-heights tuned for compact dashboard density.
- Spacing scale: 2,4,8,12,16,24,32,48,64 (map to Tailwind spacing tokens).
- Radii: sm (4px), md (8px), lg (12px).
- Elevation: shadow-sm, shadow-md, shadow-lg.

Theme design overview
- Implementation: expose CSS variables for all semantic tokens and provide two token sets (light, dark). Use data-theme="light" / data-theme="dark" on the <html> or <body> element for runtime switching. Tailwind config should reference these CSS vars so components use the same tokens whether in light or dark.
- Accessibility: ensure text-on-background contrast meets WCAG AA. Provide dev tooling (storybook+a11y addon, axe checks) to catch regressions.

Color palettes (semantic examples)
- Light theme (pastel red + gold accents):
  - background-surface: --color-surface: #FFFFFF
  - background-muted: --color-muted: #FBF7F7 (very pale warm)
  - text-primary: --color-text: #0F1722 (near-black for good contrast)
  - border: --color-border: #E9E3E3
  - interactive: --color-interactive: #E96B6B (pastel red primary)
  - interactive-strong: --color-interactive-strong: #D64545 (deeper red for emphasis)
  - accent-gold: --color-accent-1: #FFDDAA (soft gold)
  - accent-gold-strong: --color-accent-2: #FFC260
  - success: --color-success: #2BAF6F
  - warning: --color-warning: #E6A23C
  - danger: --color-danger: #D64545
  - surface-elevated: --color-surface-elev: #FFFFFF (or subtle tint #FFF7F6)
  Notes: Pastel red is used for primary interactive elements, errors, and attention. Gold accents are for highlights, badges, and positive callouts. Use the deeper red for hover/active states.

- Dark theme (navy + forest green accents):
  - background-surface: --color-surface: #0B1020 (deep navy charcoal)
  - background-muted: --color-muted: #0F1726
  - text-primary: --color-text: #E6F0EA (very light minty off-white for contrast)
  - border: --color-border: #172033
  - interactive: --color-interactive: #1F6B4A (forest green)
  - interactive-strong: --color-interactive-strong: #0F4B3A (darker forest)
  - accent-navy: --color-accent-1: #1D2B50 (muted navy)
  - accent-green: --color-accent-2: #2E8B57 (vivid forest for highlights)
  - success: --color-success: #55D089
  - warning: --color-warning: #E8B45B
  - danger: --color-danger: #E07A7A
  - surface-elevated: --color-surface-elev: #0F1726 (slightly lighter than surface)
  Notes: Dark theme favors navy surfaces with forest-green interactive accents to create a unique, calm identity. Use accent-navy for headers and muted UI chrome, accent-green for CTAs and positive states.

Accent scales
- Provide an accent scale for expressive UI (accent-1..accent-6) per theme so designers and developers can choose more/less saturated tones. These should be present in token JSON files for both light and dark.

Token files and Tailwind integration
- Token files: /src/design/tokens/light.json and /src/design/tokens/dark.json with the full set of semantic vars + accent scales.
- CSS variables: output a small utils.css that maps token JSON to :root and [data-theme="dark"] blocks, e.g. :root { --color-text: #... } [data-theme="dark"] { --color-text: #... }
- Tailwind config: extend colors with references to the CSS variables, e.g. colors: { primary: 'var(--color-interactive)', 'surface': 'var(--color-surface)' }
- Provide utility classes for subtle semantic needs: .bg-surface, .text-muted, .border-subtle that map to variables.

Typography
- Use Inter variable font across UI. Add font-face via Google Fonts or self-hosted variable font files for privacy and performance.
- System stack fallback: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial
- Provide ready-to-use Tailwind theme extension for fontFamily: { sans: ['InterVariable', 'ui-sans-serif', ...] }

Component theming examples
- Button (primary): background: var(--color-interactive), color: var(--color-surface), hover: var(--color-interactive-strong), focus-ring: 2px solid var(--color-accent-2)
- Card: background: var(--color-surface-elev), border: 1px solid var(--color-border), shadow: var(--elevation-sm)
- Badge (gold accent): background: var(--color-accent-1), color: var(--color-text)
- Badge (dark green accent): background: var(--color-accent-2), color: var(--color-surface)

Design tokens export
- Include example token JSON structures in the repo and scripts to generate CSS variables from tokens (node script or use Style Dictionary if desired but keep lightweight).

Figma and design handoff
- Provide Figma token JSON export (colors, type, spacing) and at least a few component frames: Button variants, Card, Sidebar, Topbar, RepoCard, ApplicationCard.
- Indicate how light and dark tokens map to Figma styles for designers.

Developer ergonomics & stories
- Storybook stories showing light/dark switch, tokens panel, and component variants. Include a dark-mode toggle and token inspector.
- Provide a theme switch hook in the app: useTheme() with persistent preference in localStorage and a system-preference default.

Accessibility notes
- When using pastel/red & gold in light mode, check contrast; use stronger text colors on top of pastel backgrounds for readability. Avoid large text using low-contrast pastel alone.
- Focus states must be visible in both themes; prefer a consistent focus ring color derived from accent-2 with sufficient contrast against background.

Deliverables
- /src/design/tokens/{light.json,dark.json}
- /src/styles/theme.css (generated variables), tailwind.config.js updates
- Storybook with token docs and component examples
- README usage guide describing how to use tokens, switch themes, and add new tokens


