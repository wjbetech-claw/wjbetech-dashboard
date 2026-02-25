# Active Job Contract (`ActiveJob`)

Defines the single "current focus" entity shown on the dashboard and used for context handoff between agent and app state.

## Canonical TypeScript Shape

```ts
export type ActiveJobSource = "auto_pr" | "auto_commit" | "auto_kanban" | "manual_user" | "manual_agent";
export type ActiveJobKind = "pull_request" | "issue" | "kanban_card" | "job_application" | "custom";

export interface ActiveJob {
  id: string;
  title: string;
  summary: string | null;
  kind: ActiveJobKind;
  source: ActiveJobSource;
  confidence: number;
  signal: string;
  repoId: string | null;
  repoFullName: string | null;
  relatedPrId: string | null;
  relatedIssueId: string | null;
  relatedKanbanCardId: string | null;
  url: string | null;
  updatedAt: string;
  createdAt: string;
  expiresAt: string | null;
}
```

## Validation Rules

- `confidence` is a number in range `0..1`.
- `signal` is a short human-readable explanation of why this became active.
- When `kind === 'pull_request'`, `relatedPrId` should be present.
- When `source` is manual (`manual_user` or `manual_agent`), `confidence` defaults to `1`.
- `expiresAt` optional; when present must be `>= updatedAt`.

## JSON Example

```json
{
  "id": "aj_2026_02_25_01",
  "title": "Finalize contracts for dashboard entities",
  "summary": "Complete and validate schema docs for repo, workflow, PR, jobs, and active focus",
  "kind": "pull_request",
  "source": "auto_pr",
  "confidence": 0.91,
  "signal": "Most recently updated open PR (#101) in current workspace repository",
  "repoId": "gh_R_kgDOExample",
  "repoFullName": "wjbetech-claw/wjbetech-dashboard",
  "relatedPrId": "gh_pr_101",
  "relatedIssueId": null,
  "relatedKanbanCardId": null,
  "url": "https://github.com/wjbetech-claw/wjbetech-dashboard/pull/101",
  "updatedAt": "2026-02-25T12:31:00.000Z",
  "createdAt": "2026-02-25T12:29:00.000Z",
  "expiresAt": null
}
```

## API Usage

- `GET /api/active-job` -> `ActiveJob | null`
- `PUT /api/active-job` -> set manual active job.
- `POST /api/active-job/recompute` -> force auto-detection.

## OpenClaw Solo Implementation Instructions

1. Implement `src/contracts/activeJob.ts` with schema and refinements.
2. Build deterministic ranking algorithm:
   - candidate signals: latest open PR update, latest authored commit, top-priority Kanban card,
   - assign confidence weights and choose max.
3. Save computed record with source trace (`signal`) for explainability.
4. Allow manual override endpoint that pins active job for configurable TTL (default 2h).
5. Add tests:
   - deterministic winner selection,
   - manual override beats auto until expiration,
   - confidence bounds enforced.

## Acceptance Criteria

- Dashboard `ActiveJob` card can render from this contract only (`title`, `signal`, `updatedAt`, `url`).
- User can override auto-selected item and see override immediately.
