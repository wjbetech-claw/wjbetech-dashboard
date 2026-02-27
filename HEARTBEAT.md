# HEARTBEAT — wjbetech-dashboard

This file defines the execution contract for OpenClaw and records activity.
It is append-only below the contract section.

---

## EXECUTION CONTRACT (MANDATORY)

On every run, OpenClaw MUST:

1. Read this file completely.
2. Read CLAW.md (if present).
3. Read TODO.md at repo root.
4. Execute the topmost unchecked task in TODO.md.
5. Repeat until:
   - The user explicitly stops execution, OR
   - A hard blocker is reached (see Blockers section).

OpenClaw must operate in a continuous loop.

---

## TASK EXECUTION RULES

For each task:

1. Create a branch:
   chore/agent-<YYYY-MM-DD>-<short-slug>

2. Implement only that task.
3. Ensure quality gates pass:
   - npm run lint (if exists)
   - npm run test (if exists)
   - npm run typecheck (if exists)
   - npm run build (if exists)

4. Open a PR:
   Title: [agent] <task title>
   Description must include:
   - What changed
   - Why
   - How to verify
   - Risks / follow-ups
   All PR's should be set to auto merge.

5. If CI passes:
   - Merge automatically (if repo allows)
   - Delete branch
   - Mark task complete in TODO.md
     - The style for completing tasks should look like this: [x]
6. Append heartbeat entry.
7. Move to next unchecked task immediately.

---

## BLOCKERS

If a task fails:

1. Retry with smaller scope.
2. Search existing codebase for patterns.
3. Add logging/tests to isolate issue.
4. If unresolved:
   - Open PR documenting blocker clearly.
   - Mark task as blocked in TODO.md.
   - Continue with next unblocked task.

Only stop if:
- Dependency installation is broken
- CI is fundamentally failing
- Environment prevents any progress

When stopping due to blocker:
- Log exact command run
- Log exact error
- Log what was attempted
- Log recommended fix

---

## HEARTBEAT LOG (Append Below)

Format:

<UTC timestamp> | <branch or PR> | <status> | <note>

Example:

2026-02-27T06:12:00Z | chore/agent-2026-02-27-stabilize-scripts | branch-created | starting task
