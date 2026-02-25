# Repository Contract (`Repo`)

Defines the normalized repository object used by dashboard pages, API responses, and cache records.

## Canonical TypeScript Shape

```ts
export type RepoHealth = "green" | "yellow" | "red" | "unknown";

export interface Repo {
  id: string;
  owner: string;
  name: string;
  fullName: string;
  description: string | null;
  defaultBranch: string;
  private: boolean;
  archived: boolean;
  url: string;
  lastCommitSha: string | null;
  lastCommitAt: string | null;
  openPrCount: number;
  workflowCount: number;
  health: RepoHealth;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

## Validation Rules

- `id`: non-empty, stable ID (`gh_<nodeId>` recommended).
- `owner`, `name`, `fullName`: required; `fullName` must be `${owner}/${name}`.
- `url`: absolute HTTPS URL.
- `health`: one of `green | yellow | red | unknown`.
- Count fields (`openPrCount`, `workflowCount`) must be integers `>= 0`.
- Date fields use ISO 8601 UTC (`new Date().toISOString()`).
- `tags`: de-duplicated lowercase strings.

## JSON Example

```json
{
  "id": "gh_R_kgDOExample",
  "owner": "wjbetech-claw",
  "name": "wjbetech-dashboard",
  "fullName": "wjbetech-claw/wjbetech-dashboard",
  "description": "Internal engineering dashboard",
  "defaultBranch": "main",
  "private": false,
  "archived": false,
  "url": "https://github.com/wjbetech-claw/wjbetech-dashboard",
  "lastCommitSha": "6a4b2f0",
  "lastCommitAt": "2026-02-25T12:14:07.000Z",
  "openPrCount": 4,
  "workflowCount": 12,
  "health": "green",
  "tags": ["frontend", "dashboard"],
  "createdAt": "2026-01-15T08:01:00.000Z",
  "updatedAt": "2026-02-25T12:20:00.000Z"
}
```

## API Usage

- `GET /api/repos` -> `{ "repos": Repo[] }`
- `GET /api/repos/:id` -> `Repo`
- `GET /api/overview` includes lightweight repo summary derived from `Repo`.

## OpenClaw Solo Implementation Instructions

1. Create `src/contracts/repo.ts` with:
   - `RepoSchema` (Zod), `RepoHealthSchema`, and exported `Repo` type.
2. Build a mapper in backend integration layer:
   - `mapGithubRepoToRepo(githubRepo, stats): Repo`.
3. Add a health calculator:
   - `red` if default branch failing workflows in last 24h,
   - `yellow` if no failures but pending checks,
   - `green` if all recent checks pass,
   - `unknown` when no workflow data.
4. Validate every outbound payload with `RepoSchema.parse` before sending API response.
5. Add unit tests:
   - valid object,
   - invalid `fullName`,
   - negative counts,
   - invalid `health` enum.

## Acceptance Criteria

- Frontend can render the repos table without `any` casting.
- API rejects invalid repo payloads with structured validation errors.
- Health badges are deterministic for same input data.
