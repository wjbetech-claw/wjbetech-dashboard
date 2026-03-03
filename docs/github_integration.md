GitHub Integration — Backend Wiring

This document lists the lightweight backend endpoints and services implemented for GitHub integration.

Endpoints:
- GET /api/featured/:username — returns top 5 starred repos for a user (featured repos)
- GET /api/repo-activities/:owner/:repo — returns recent events for the specified repo
- GET /api/pr-tracking/:owner/:repo — returns open PRs with basic commit status information
- GET /api/repos — lists authenticated user's repos (uses GITHUB_TOKEN)
- GET /api/pulls/:owner/:repo — lists pulls for a repo
- GET /api/workflows/:owner/:repo — lists GitHub Actions workflows for a repo
- GET /api/overview — returns simple overview (user + repo count)

Services:
- src/services/githubRepoService.ts — fetchFeaturedRepos, fetchRepoActivities, fetchPRTracking
- src/services/githubClient.ts — Octokit wrapper with basic rate-limit handling
- src/services/octokit.ts — Octokit factory

Workers:
- src/workers/syncWorker.ts — periodic sync helper (syncOnce, startPeriodicSync)

Environment:
- GITHUB_TOKEN must be provided in env to authenticate requests.
