# WORKFLOW_AUTO.md

This document defines the **fully repeatable, container-correct autonomous workflow** for developing and maintaining `wjbetech-dashboard`.

This file is written for OpenClaw running inside Docker.

---

## Core Objective

Convert `TODO.md` items into:

1. Small, isolated branches  
2. Green CI PRs  
3. Auto-merged changes  
4. Immediate continuation to the next task  

Main must always stay deployable.

---

## 🔒 Working Directory (Container Correct — Non-Negotiable)

All commands MUST run from:

```bash
cd /workspace/apps/wjbetech-dashboard
```

Never use host paths such as `/home/will/...`.

Before any task begins, execute and print:

```bash
pwd
git status --porcelain=v1 --branch
```

If `pwd` is not `/workspace/apps/wjbetech-dashboard`, STOP and fix it.

---

## 🔐 Git Preconditions (Must Be True)

Before any commit or push:

```bash
git config --global --get-all safe.directory
git remote -v
```

Requirements:

- `/workspace` must be in `safe.directory`
- `origin` must be HTTPS with token:
  
  ```
  https://x-access-token:***@github.com/wjbetech-claw/wjbetech-dashboard.git
  ```

If not, fix it before proceeding.

---

## 🧭 Task Execution Protocol

For each TODO item:

### 1️⃣ Create a branch

```bash
git checkout -b feat/<short-task-name>
```

Branch names must reflect scope.

---

### 2️⃣ Implement the change

- Make minimal, focused changes
- Do not refactor unrelated areas
- Keep PRs small

---

### 3️⃣ Run local checks before committing

```bash
npm install
npm run lint
npm run typecheck
npm test
```

If any command fails:
- Print full output
- Fix
- Re-run
- Do not continue until green

---

### 4️⃣ Commit

```bash
git add .
git commit -m "feat: <clear description>"
```

---

### 5️⃣ Push

```bash
git push -u origin HEAD
```

Must not prompt for credentials.

If it prompts → infrastructure error → stop and report.

---

### 6️⃣ Open PR

```bash
gh pr create \
  --title "feat: <description>" \
  --body "Implements TODO item: <reference>" \
  --base main
```

Immediately print the PR URL.

---

### 7️⃣ Enable Auto-Merge

```bash
gh pr merge --auto --merge
```

---

### 8️⃣ Monitor CI

If CI fails:

```bash
gh run list
gh run view <run-id> --log
```

- Fix the issue
- Push new commit
- Repeat until green

---

## 🚨 Failure Protocol

If any command:

- Hangs
- Prompts for input
- Errors
- Cannot access a file
- Cannot authenticate

Then:

1. Print the exact raw error.
2. Stop.
3. Do not continue.
4. Do not “plan next steps”.

---

## 🚫 Forbidden Behavior

Do NOT:

- Announce plans without executing commands
- Continue after a failed command
- Skip lint/tests
- Modify multiple TODO items in one PR
- Use host filesystem paths

---

## 🔁 Continuous Mode

After a PR merges:

1. Checkout main
2. Pull latest
3. Move to next TODO item
4. Repeat entire protocol

Never ask what to do next if `TODO.md` contains items.

---

## 🧪 Proof Requirement

Every task update must include one of:

- Raw command output
- A PR link
- CI log snippet

No narrative-only updates.

---

## 🏁 Definition of Done

A task is done when:

- PR merged
- main is green
- Local working tree is clean

---

This workflow is mandatory.

If any step cannot be executed, report why immediately.
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
