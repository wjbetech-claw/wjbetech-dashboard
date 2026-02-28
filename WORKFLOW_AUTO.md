# WORKFLOW_AUTO.md

This document defines the **repeatable, mostly-autonomous workflow** for developing and maintaining the `wjbetech-dashboard` app.  
It is designed so that a human (you) or an agent (OpenClaw / CI-driven automation) can execute tasks consistently, create PRs safely, and keep the main branch green.

---

## Goals

1. Convert `todo.md` items into small, safe PRs.
2. Keep `main` always deployable.
3. Auto-merge PRs **only** when checks pass.
4. Detect snags early and surface them immediately (CI failures, build breaks, env issues).
5. Make it easy to “continue to the next task” without re-triaging every time.

---

## Repo Boundaries & Working Directory (Non-Negotiable)

**Always run commands from the app root:**

- If this app lives at: `openclaw/apps/wjbetech-dashboard/`
- Then your working directory for *everything* should be:

```bash
cd /home/will/openclaw/apps/wjbetech-dashboard
