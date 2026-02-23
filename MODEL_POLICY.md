# Model Usage Policy

Purpose
- Define which models to use for different task classes and enforce safe, auditable selection when agents run work.

Policy
1. Default (low-demand) tasks: Use `gpt-5-mini`.
   - Examples: short text summaries, triage, formatting, small edits, simple data extraction, issue/PR templating, routine documentation, non-code planning.
   - Cost and latency optimized.

2. Complex programming, deep code generation, and high-fidelity UX production: Use `gpt-codex-5.3` (also referred to as Codex 5.3) — ONLY when:
   - A human review gate approves model escalation, or
   - The task meets an objective threshold (complexity metrics, e.g., > N lines of code, multi-file refactor, or security-sensitive code change).

3. Escalation process
   - An agent detects a task complexity above the default threshold, and produces an `escalation.md` report describing:
     - Task summary
     - Reason for escalation (complexity, security, UX fidelity)
     - Files or modules affected
     - Estimated prompt length and output assets
   - The `project-manager` persona (human) reviews the escalation and must approve by adding an approval note (comment) in the escalation file or an explicit GitHub label `model:codex-approve` on the issue/PR.
   - Only after approval the agent will run `gpt-codex-5.3` for that task.

4. Audit & Logging
   - Every use of `gpt-codex-5.3` must be logged into `MODEL_AUDIT.log` with: timestamp, user/agent, repo/path, prompt hash, rationale, and link to approval.
   - Low-demand uses of `gpt-5-mini` are logged at a summary level at least once per day with counts per persona/task.

5. Safety limits
   - No model is allowed to execute shell commands or write to production systems without a signed human authorization (PR merge or repo maintainer approval).
   - Code produced by any model must pass automated tests and a security vet (skill-vetter) before being merged to protected branches.

Implementation notes
- Enforce the policy with an automation workflow in `.github/workflows/model-policy.yml` that checks PR labels and verifies `escalation.md` presence before allowing a codex-powered commit to proceed.
- Add `scripts/record_model_usage.py` to append audit entries when model-powered tasks run (agents invoke it with the required metadata).
