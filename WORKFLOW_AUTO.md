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

All commands MUST run from the repo root.

Container:
```bash
cd /workspace/
```

Never use `/workspace/apps/wjbetech-dashboard` or any `apps/` path.

Before any task begins, execute and print:

```bash
pwd
git status --porcelain=v1 --branch
```

If `pwd` is not `/workspace/`, STOP and fix it.

---

## 🔐 Git Preconditions (Must Be True)

Before any commit or push:

```bash
git config --global --get-all safe.directory
git remote -v
```

Requirements:

- `/workspace` must be in `safe.directory`
- DO NOT require subdirectories in safe.directory
- `origin` must be HTTPS with token:
  
  ```
  https://x-access-token:***@github.com/wjbetech-claw/wjbetech-dashboard.git
  ```

If not, fix it before proceeding.

---

## 🧭 Task Execution Protocol

For each TODO item:

### 0️⃣ Read relevant docs

- README.md, WORKFLOW_AUTO.md, and any feature-specific docs or patterns.

### 1️⃣ Create a branch

```bash
git checkout -b chore/agent-<YYYY-MM-DD>-<short-task-name>
```

Branch names must reflect scope.

---

### 2️⃣ Implement the change

- Make minimal, focused changes
- Do not refactor unrelated areas
- Keep PRs small
- Add or update tests for new behavior

---

### 3️⃣ Run local checks before committing

```bash
npm ci
npm run lint --if-present
npm run test --if-present
npm run typecheck --if-present
npm run build --if-present
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
git commit -m "<type>: <clear description>"
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
  --title "<type>: <description>" \
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
- Use host filesystem paths for container-only runs

---

## 🔁 Continuous Mode

After a PR merges:

1. Checkout main
2. Pull latest
3. Move to next TODO item
4. Repeat entire protocol

Never ask what to do next if `TODO.md` contains items.

---

## 🔁 Autonomous Task Loop (Required)

After a PR is opened:

1. Enable auto-merge.
2. Monitor CI until it is green.
3. If CI fails:
   - pull logs
   - fix
   - push
   - repeat until green
4. Once the PR merges, immediately:
   - `git checkout main`
   - `git pull --ff-only`
   - read `TODO.md`
   - select the next unchecked item
   - create a new branch
   - start the next task

### Mandatory “Start of Task” update (no exceptions)
When starting a new TODO item, post a message that includes:

- The exact TODO line you are working on
- The branch name
- Output of:
  - `pwd`
  - `git status --porcelain=v1 --branch`

### Mandatory “Completion” update
When a task PR is created, post:

- PR link
- Auto-merge status
- Latest CI run link or status summary

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
---
