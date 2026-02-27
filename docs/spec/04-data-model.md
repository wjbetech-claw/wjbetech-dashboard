Data Model — Entities and Relationships

Core entities
- User
  - id (uuid)
  - github_id (nullable)
  - email
  - name
  - avatar_url
  - settings (json)
  - created_at, updated_at

- Repository (mirrored from GitHub)
  - id (uuid)
  - github_id
  - owner
  - name
  - full_name
  - description
  - primary_language
  - stars
  - forks
  - last_commit_at
  - metadata (json)
  - synced_at

- Issue
  - id (uuid)
  - github_id
  - repo_id (fk)
  - number
  - title
  - body
  - state (open/closed)
  - labels (json array)
  - assignees (json array)
  - created_at, updated_at

- PullRequest
  - id (uuid)
  - github_id
  - repo_id
  - number
  - title
  - state
  - merged_at
  - checks_status (json)

- Job
  - id (uuid)
  - source (github/lever/greenhouse/csv)
  - source_id
  - title
  - company_name
  - location
  - remote (bool)
  - description (text)
  - tags (json array)
  - posted_at
  - raw_payload (json)
  - imported_by (fk user, nullable)

- Application
  - id (uuid)
  - user_id (fk)
  - job_id (fk nullable — for manually added applications job_id may be null)
  - company_name
  - role_title
  - stage (enum: saved, applied, phone, onsit, offer, rejected)
  - resume_snapshot_id (fk)
  - notes (text)
  - metadata (json)
  - created_at, updated_at

- ResumeSnapshot
  - id (uuid)
  - user_id
  - file_url (S3 or storage path)
  - parsed_text (text)
  - parsed_json (json)
  - created_at

Indexes & search
- Use Postgres full-text search on job.title + job.description + company_name
- Index: jobs(source, posted_at), repos(github_id), users(email)

Prisma schema suggestions
- Provide models matching the entities above with relations and enums

Sync behavior
- GitHub sync: upsert repos, issues, PRs. Use webhooks for realtime updates where possible; otherwise scheduled syncs.
- Job imports: idempotent import based on source + source_id

Data retention & privacy
- Allow user to delete account and all associated data; cascade deletes for personal data
- Store only necessary scraped job data; do not store third-party personal data longer than needed


