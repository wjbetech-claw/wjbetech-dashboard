# Job Contract (`JobListing`)

Defines normalized job listing data for discovery, saved jobs, and application pipeline views.

## Canonical TypeScript Shape

```ts
export type JobSource = "linkedin" | "indeed" | "greenhouse" | "lever" | "manual" | "other";
export type JobPipelineStatus =
  | "discovered"
  | "saved"
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
  | "archived";

export interface JobListing {
  id: string;
  externalId: string | null;
  source: JobSource;
  title: string;
  company: string;
  location: string | null;
  remote: boolean;
  employmentType: "full_time" | "part_time" | "contract" | "internship" | "unknown";
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  url: string;
  postedAt: string | null;
  discoveredAt: string;
  status: JobPipelineStatus;
  notes: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

## Validation Rules

- `title`, `company`, `url`, `source`, `status` are required.
- `url` must be absolute HTTPS.
- If both salary bounds exist, `salaryMin <= salaryMax`.
- `status` follows one-way progression by default (manual override allowed with explicit reason).
- `tags` are lowercase and deduplicated.

## JSON Example

```json
{
  "id": "job_3vb0m2",
  "externalId": "lnk_7781332",
  "source": "linkedin",
  "title": "Senior Frontend Engineer",
  "company": "Nimbus Labs",
  "location": "Remote - US",
  "remote": true,
  "employmentType": "full_time",
  "salaryMin": 165000,
  "salaryMax": 205000,
  "salaryCurrency": "USD",
  "url": "https://www.linkedin.com/jobs/view/7781332",
  "postedAt": "2026-02-24T09:00:00.000Z",
  "discoveredAt": "2026-02-25T01:11:22.000Z",
  "status": "saved",
  "notes": "Good match for React platform work",
  "tags": ["react", "typescript", "remote"],
  "createdAt": "2026-02-25T01:11:22.000Z",
  "updatedAt": "2026-02-25T01:30:00.000Z"
}
```

## API Usage

- `GET /api/jobs` -> `{ "jobs": JobListing[] }`
- `POST /api/jobs/:id/save`
- `POST /api/jobs/:id/apply`
- `PATCH /api/jobs/:id` for notes/status updates.

## OpenClaw Solo Implementation Instructions

1. Create `src/contracts/job.ts` with schema + salary refinement.
2. Build source adapters returning raw payloads; normalize into `JobListing`.
3. Implement deduplication key:
   - prefer `externalId`,
   - fallback to hash of `source + company + title + url`.
4. Implement status transition guard service:
   - reject impossible jumps unless `force=true` + audit note.
5. Add tests for dedupe behavior and salary constraints.

## Acceptance Criteria

- Jobs page can render list and status actions using one normalized type.
- Re-running ingestion does not create duplicate rows for same external listing.
