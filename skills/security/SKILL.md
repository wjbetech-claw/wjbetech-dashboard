---
name: security
description: Security best practices for OpenClaw infra and skills. Use when reviewing skill code, CI pipelines, or repository configuration for vulnerabilities.
---

# Security Skill

This skill lists practical checks and mitigations for infrastructure and agent skills:

- Secrets: Ensure secrets aren't committed; scan history for leaks; use git-secrets / pre-commit hooks.
- Dependency scanning: Use tools like Snyk or Dependabot and automate PRs for fixes.
- Skill vetting: Static code review checklist (no remote exec, validate npm installs, avoid eval/exec on untrusted inputs).
- CI hardening: require status checks, limit GITHUB_TOKEN scopes when possible, avoid unchecked workflow runs from forks.
- Runtime isolation: run untrusted code in sandboxes/containers; prefer ephemeral runners for risky tasks.

When to use
- Use this skill when auditing or adding new skills, configuring CI, or deploying automation that touches credentials or infra.
