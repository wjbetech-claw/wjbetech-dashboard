# OpenClaw Repo Rules

## Source of truth
- All configuration lives in this repository under:
  - /skills
  - /agents
  - /docs
- Do NOT store secrets in git.

## Git rules (non-negotiable)
- Do NOT use `gh`.
- Do NOT change git remotes.
- Do NOT create or delete repositories.
- To push changes, run only:
  - `./scripts/push-setup.sh "<message>"`

## File rules
- Never commit:
  - `.env`
  - tokens/keys
  - `openclaw.json` containing credentials
