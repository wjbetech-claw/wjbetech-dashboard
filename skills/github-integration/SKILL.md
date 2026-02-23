---
name: github-integration
description: Automate and manage GitHub operations: repo creation patterns, PR workflows, CODEOWNERS, and safe automation via Actions and fine-grained tokens.
---

# GitHub Integration Skill

Purpose
- Provide procedural instructions for GitHub automation: create repos, configure branch protection, add CODEOWNERS, and securely store secrets.

Key guidance
- Use GitHub Actions with GITHUB_TOKEN or fine-grained tokens stored in GitHub Secrets for automation.
- Do not embed PATs in files. Rotate tokens frequently and use minimal scopes.
- For programmatic repo operations prefer GitHub Apps or fine-grained tokens scoped to specific repos.

Common tasks
- Create standard CODEOWNERS file contents for infra repositories.
- Add branch protection rules via Actions or gh api (examples provided but must be executed by a human/CI).

When to use
- Use when automating repo setup, managing PR workflows, or configuring CI/CD.
