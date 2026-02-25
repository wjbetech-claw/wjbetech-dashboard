# Pull Request Contract (`PullRequest`)

Defines normalized pull request data used in overview, repos page, and active job detection.

## Canonical TypeScript Shape

```ts
export type PrState = "open" | "closed" | "merged";
export type PrReviewState = "approved" | "changes_requested" | "commented" | "pending" | "none";

export interface PullRequest {
  id: string;
  repoId: string;
  repoFullName: string;
  number: number;
  title: string;
  author: string;
  branch: string;
  baseBranch: string;
  state: PrState;
  reviewState: PrReviewState;
  labels: string[];
  draft: boolean;
  additions: number;
  deletions: number;
  changedFiles: number;
  commentsCount: number;
  commitsCount: number;
  htmlUrl: string;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
  mergedAt: string | null;
}
```

## Validation Rules

- `number` positive integer.
- `state` is one of `open | closed | merged`.
- If `state === 'merged'`, `mergedAt` is required and `closedAt` may be equal to `mergedAt`.
- If `state === 'open'`, `closedAt` and `mergedAt` must be `null`.
- Numeric counters are integers `>= 0`.

## JSON Example

```json
{
  "id": "gh_pr_101",
  "repoId": "gh_R_kgDOExample",
  "repoFullName": "wjbetech-claw/wjbetech-dashboard",
  "number": 101,
  "title": "feat: add contracts for dashboard entities",
  "author": "wjbea",
  "branch": "feat/contracts",
  "baseBranch": "main",
  "state": "open",
  "reviewState": "pending",
  "labels": ["feature", "contracts"],
  "draft": false,
  "additions": 243,
  "deletions": 11,
  "changedFiles": 7,
  "commentsCount": 3,
  "commitsCount": 4,
  "htmlUrl": "https://github.com/wjbetech-claw/wjbetech-dashboard/pull/101",
  "createdAt": "2026-02-24T15:40:00.000Z",
  "updatedAt": "2026-02-25T12:06:00.000Z",
  "closedAt": null,
  "mergedAt": null
}
```

## API Usage

- `GET /api/repos/:id/pulls` -> `{ "pulls": PullRequest[] }`
- `GET /api/overview` includes recent PR queue summary derived from this model.

## OpenClaw Solo Implementation Instructions

1. Create `src/contracts/pr.ts` with schema and state consistency refinements.
2. Build GitHub mapping function:
   - map review rollup to `reviewState` enum,
   - normalize label names to lowercase.
3. Add DB index strategy (if persistence used):
   - `(repoId, state)`, `(updatedAt DESC)`, `(author, state)`.
4. Expose service method `listOpenPullRequests(repoId?: string)` used by overview + repo pages.
5. Add tests for merged/open state invariants and URL validity.

## Acceptance Criteria

- Repos page “Recent pull requests” section can render from API data only.
- Active job detector can pick latest open PR by `updatedAt`.
