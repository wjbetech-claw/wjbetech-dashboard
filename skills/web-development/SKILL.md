---
name: web-development
description: Guidance and templates for common web frontend and backend tasks — use when building React/Vite apps, setting up CI/CD for web projects, or generating production-ready static sites.
---

# Web Development Skill

This skill provides concise, actionable patterns and templates for web projects:

- Project scaffolding: recommended file layout, package.json scripts, and dev vs prod build differences
- Frontend: Vite + React + Tailwind skeleton, hot-reload guidance, CORS and environment handling
- Backend: Minimal Node/Express and serverless patterns, JWT auth guidance
- Deployment: GitHub Pages, Vercel, Netlify patterns and CI hints
- Security: common hardening (CSP, HTTPS, secrets handling)

When to use
- Use when asked to create or modify web apps, add CI workflows, or advise on deployment and security setups.

Resources
- templates/ contains code snippets and example workflows (CI, lint, build)
- Recommended skills to load when available: github-integration, security, devops-cloud

Safety
- Never write secrets into code or checked files. Use environment variables and GitHub Secrets for CI.
