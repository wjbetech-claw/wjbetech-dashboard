Quality Bar — Tests, CI, and Acceptance

Testing strategy
- Unit tests: Jest + Testing Library for components and helper functions
- Integration tests: API routes and DB interactions using test DB and fixtures
- E2E tests: Playwright covering core user flows (onboard, link GitHub, view dashboard, import job, create application)
- Accessibility: axe core checks in CI and Storybook

CI pipeline (GitHub Actions)
- PR flow: run lint, typecheck, unit tests, storybook build, and E2E on main important flows
- Main branch: run full test suite and deploy to staging
- Dependabot and automatic security updates where possible

Code quality
- Enforce Prettier + ESLint with recommended rules and TypeScript strict mode
- PR checklist: description, linked issue, screenshots, tests added

Performance
- Lighthouse baseline: maintain >90 performance for core dashboard interactions
- Use code-splitting and lazy loading for heavy components

Acceptance criteria for features
- Feature has at least one E2E and integration test
- Accessibility checks pass (no critical violations)
- Deployed to staging and smoke-tested

Monitoring
- Logging: structured logs (pino) with request ids
- Error tracking: Sentry (free tier) or self-hosted alternative
- Metrics: track request latency, background job durations, sync failures


