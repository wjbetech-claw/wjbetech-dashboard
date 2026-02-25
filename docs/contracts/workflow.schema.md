# Workflow Contract (`WorkflowRun`)

Defines normalized CI/CD workflow run data for overview cards, repo detail pages, and alerting.

## Canonical TypeScript Shape

```ts
export type WorkflowStatus = "queued" | "in_progress" | "completed";
export type WorkflowConclusion = "success" | "failure" | "cancelled" | "skipped" | "timed_out" | "neutral" | null;

export interface WorkflowRun {
  id: string;
  repoId: string;
  repoFullName: string;
  name: string;
  branch: string;
  status: WorkflowStatus;
  conclusion: WorkflowConclusion;
  actor: string;
  commitSha: string;
  commitMessage: string | null;
  runNumber: number;
  htmlUrl: string;
  startedAt: string | null;
  completedAt: string | null;
  durationMs: number | null;
  createdAt: string;
  updatedAt: string;
}
```

## Validation Rules

- `id`, `repoId`, `repoFullName`, `name`, `branch`, `actor`, `commitSha`, `htmlUrl`: required.
- `status` must be one of `queued | in_progress | completed`.
- If `status !== 'completed'`, then `conclusion` MUST be `null`.
- If both `startedAt` and `completedAt` exist, `durationMs >= 0`.
- `runNumber` must be positive integer.

## JSON Example

```json
{
  "id": "gh_wr_3910291",
  "repoId": "gh_R_kgDOExample",
  "repoFullName": "wjbetech-claw/wjbetech-dashboard",
  "name": "CI",
  "branch": "main",
  "status": "completed",
  "conclusion": "success",
  "actor": "wjbea",
  "commitSha": "6a4b2f0",
  "commitMessage": "feat(ui): polish repos page",
  "runNumber": 244,
  "htmlUrl": "https://github.com/wjbetech-claw/wjbetech-dashboard/actions/runs/3910291",
  "startedAt": "2026-02-25T11:55:10.000Z",
  "completedAt": "2026-02-25T11:57:51.000Z",
  "durationMs": 161000,
  "createdAt": "2026-02-25T11:55:00.000Z",
  "updatedAt": "2026-02-25T11:57:51.000Z"
}
```

## API Usage

- `GET /api/repos/:id/workflows` -> `{ "workflows": WorkflowRun[] }`
- `GET /api/overview` -> pipeline cards derived from latest `WorkflowRun` per repo.

## OpenClaw Solo Implementation Instructions

1. Implement `src/contracts/workflow.ts` with strict schema refinements:
   - enforce status/conclusion relationship.
2. Create `normalizeWorkflowRun(githubRun)` mapper.
3. Compute `durationMs` server-side from timestamps (never trust upstream field).
4. Add query method:
   - `listWorkflowRunsByRepo(repoId, limit = 20)` sorted descending by `createdAt`.
5. Add tests for transition correctness:
   - `queued -> in_progress -> completed` payloads,
   - invalid case `status: in_progress` + non-null `conclusion` should fail.

## Acceptance Criteria

- Repos page can display status chips + progress using workflow contract only.
- Alerting logic can identify failing runs using `conclusion === 'failure'`.
