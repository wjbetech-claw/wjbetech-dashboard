# Developer Guide

This guide covers code layout, conventions, local development workflows, tests, linting, and CI for the wjbetech Dashboard.

Project layout

- package.json — scripts and deps
- src/ — application source code (React + TypeScript)
- public/ — static assets
- docs/ — documentation (this folder)

Recommended toolchain

- Node 18+ and npm
- TypeScript
- Vite (already configured)
- ESLint for linting
- Prettier for code formatting
- Vitest for unit tests
- GitHub Actions for CI

Scripts (common)

- `npm run dev` — start dev server
- `npm run build` — build production
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
- `npm run format` — run Prettier
- `npm run test` — run Vitest

ESLint & Prettier

- Use ESLint with recommended React/TypeScript plugins. Example config entries:
  - `eslint:recommended`, `plugin:react/recommended`, `plugin:@typescript-eslint/recommended`
- Use Prettier for formatting and integrate with ESLint (`eslint-config-prettier`) to avoid conflicts.
- Add pre-commit hooks (husky + lint-staged) to run `npm run lint` and `npm run format` on staged files.

TypeScript

- Keep `strict: true` enabled in tsconfig.json for safety.
- Prefer explicit types for public APIs and keep components strongly typed.

Testing (Vitest)

- Use Vitest for unit tests. Place tests alongside modules with the `.test.ts` or `.test.tsx` suffix.
- Add a CI job to run tests and report coverage.

CI/CD (GitHub Actions)

- Recommended workflows:
  - `ci.yml` — run on PRs: install, lint, test, build.
  - `release.yml` — on tag push: build and publish artifacts (if any).
  - `deploy.yml` — optional: trigger Vercel deployment (or use Vercel's integration).
- Secure practices:
  - Store secrets (API keys) in GitHub Secrets and never commit them.
  - Require PR reviews and passing checks before merging to `main` (branch protection rules).
  - Use Dependabot for dependency updates.

Branching & Commits

- Branches: `main` (production), `feat/*` for features, `fix/*` for bug fixes, `chore/*`, `docs/*` for docs.
- Commits: Conventional Commits format (e.g., `feat(ui): add settings panel`).
- PRs: include description, linked issue, testing steps, and reviewers.

Local workflow (senior-dev recommended)

1. `git checkout -b feat/123-short-description`
2. Work and commit with focused commits. Keep PRs small and testable.
3. Run tests and linters locally before pushing.
4. Open PR, request review, address comments, and merge after checks pass.

Secrets and environment

- Use `.env` for local development only; never commit it.
- For CI and production, add variables to GitHub Secrets or Vercel project settings.

Onboarding checklist for new contributors

- [ ] Read docs/getting-started.md
- [ ] Run `npm install` and `npm run dev`
- [ ] Run `npm run lint` and `npm test`
- [ ] Read contribution and code of conduct (if present)

