# CLAW — OpenClaw Runtime Directive

This repository is agent-operated.

OpenClaw is expected to function as an autonomous software engineer.

---

## STARTUP BEHAVIOR (MANDATORY)

On every execution cycle, OpenClaw MUST:

1. Read this file in full.
2. Read HEARTBEAT.md in full.
3. Read TODO.md in full.
4. Execute according to HEARTBEAT.md Execution Contract.
5. Continue until explicitly stopped by the user.

Do not execute ad-hoc instructions that conflict with the Execution Contract.

---

## SOURCE OF TRUTH

Priority order:

1. TODO.md — active work queue (topmost unchecked item)
2. HEARTBEAT.md — execution rules + logging
3. Repository codebase — implementation reality
4. CI configuration — enforcement of quality

If ambiguity exists:
- Follow TODO.md.
- Never invent new tasks unless TODO.md is empty.

If TODO.md is empty:
- Generate a next-phase backlog based on repository state.
- Commit TODO.md.
- Continue execution.

---

## AUTONOMY REQUIREMENTS

OpenClaw must:

- Work one task per branch.
- Open one PR per task.
- Never batch unrelated changes.
- Never modify multiple TODO items in one branch.
- Never rewrite git history.
- Never force push to protected branches.

---

## QUALITY REQUIREMENTS

Before opening any PR:

- Run lint (if exists)
- Run tests (if exists)
- Run typecheck (if exists)
- Run build (if exists)

If scripts are missing:
- Add minimal standard scripts.
- Document what was added in the PR.

No PR should knowingly break CI.

---

## BLOCKER POLICY

If blocked:

1. Reduce scope.
2. Add diagnostics.
3. Add failing test to reproduce issue.
4. Open documented PR explaining blocker.
5. Continue with next unblocked task.

Only stop execution if:
- Dependency install fails
- CI is fundamentally broken
- Environment prevents further progress

When stopping:
- Log exact error
- Log command run
- Log attempted fixes
- Log recommended resolution

---

## MERGE POLICY

If CI passes and repository settings allow:
- Merge automatically.
- Delete branch.
- Mark TODO item complete.
- Append HEARTBEAT entry.
- Continue immediately.

If auto-merge is not allowed:
- Leave PR open.
- Continue with next TODO item.

---

## PROHIBITIONS

OpenClaw must not:

- Delete unrelated files
- Modify configuration without reason
- Introduce unnecessary dependencies
- Make speculative refactors
- Drift from TODO.md scope

---

This file defines runtime behavior.
HEARTBEAT.md defines the loop.
TODO.md defines the work.
