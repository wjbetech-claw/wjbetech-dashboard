Developer Policies — Branching, SemVer, and Commit Conventions

Purpose

This document records repository-wide developer policies I (the senior developer persona) will follow when making changes, committing, and managing branches. It is intended to be authoritative for contributors and CI automation.

1. Versioning (SemVer)

- We follow Semantic Versioning 2.0.0 (SemVer): MAJOR.MINOR.PATCH.
  - MAJOR for incompatible API changes.
  - MINOR for added functionality in a backwards-compatible manner.
  - PATCH for backwards-compatible bug fixes.
- Release process:
  - All releases are cut from the main branch after PR review and CI passing.
  - Create a signed, annotated Git tag `vMAJOR.MINOR.PATCH` at release time.

2. Branching Model

- We use a simplified, industry-standard branching model:
  - main — always production-ready; only merged PRs; no direct pushes except by release automation.
  - develop (optional) — active integration branch for the next release (only if team size warrants).
  - feature branches — prefixed `feat/<short-description>` for new user-facing features.
  - fix/ or bugfix/ — prefixed `fix/<short-description>` for bug fixes (alternative: `hotfix/` for urgent fixes merged to main).
  - chore/ — prefixed `chore/<short-description>` for repository maintenance, tooling, CI, etc.
  - docs/ — prefixed `docs/<short-description>` for documentation-only changes.
  - refactor/ — for code restructuring without feature or behavior changes.
  - release/ — temporary branch for preparing releases (if needed).

- Branch naming guidance:
  - Use kebab-case and keep names short: `feat/user-auth` not `feature/implement-user-authentication-flow`.
  - Include ticket/issue numbers when available: `feat/123-add-login`.

3. Pull Requests & Reviews

- Every change targeting main (or develop) must be via PR with at least one approving review.
- PR title format: `<type>(<scope>): short description` where type is one of feat|fix|chore|docs|refactor|perf|test
  - Example: `feat(auth): add JWT refresh endpoint`
- PR body should include:
  - Summary of change
  - Linked issue(s)
  - Testing steps / QA notes
  - Migration notes (if any)

4. Commit Message Conventions

- We follow Conventional Commits (recommended):
  - Format: `type(scope?): subject`
  - Types: feat, fix, chore, docs, style, refactor, perf, test, revert
  - Example: `feat(api): add /users endpoint`
- Include longer description in the commit body when necessary.
- For commits that should be squashed on merge, mark `squash!` in PR and use interactive rebase locally.

5. Release Automation

- CI runs tests, lint, and build on PRs and merges to main.
- Releases should be automated via GitHub Actions:
  - On push tag `v*` -> create release, build artifacts, publish packages.

6. Enforcement

- Branch protections: require PR reviews, status checks, and signed commits for main.
- Linting & commit-msg hook: enforce Conventional Commits with a commit-msg hook (husky/validate-commit-msg).

7. Local Workflow (senior-dev recommended)

- Create a branch: `git checkout -b feat/123-add-login`
- Work, run tests locally.
- Commit with conventional messages.
- Push branch: `git push -u origin feat/123-add-login`
- Open PR, request review, address comments, merge via squash or merge commit per repo policy.

Appendix: Examples

- `feat(ui): add settings panel`
- `fix(api): handle null user email`
- `chore(ci): pin node version in workflow`

---

File added by the repo assistant persona. To change these policies, update this file and open a PR for review.
