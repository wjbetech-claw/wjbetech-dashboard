Security & Privacy

Principles
- Minimize data collection; store only what’s required.
- Encrypt sensitive data at rest (tokens) and in transit (TLS everywhere).
- Give users control: export data, delete account, view connected apps.

Authentication & Secrets
- Use GitHub OAuth for primary auth; support email login optionally with magic links
- Store access tokens encrypted (using provider/environment-managed secrets)
- Rotate keys and provide a way to revoke tokens

Data protection
- Use Postgres with row-level security where appropriate; encrypt backups
- For file uploads (resumes), use private object storage (S3-compatible) with presigned URLs

Privacy features
- Account deletion endpoint that removes user data and associated resources
- Data export: allow user to download JSON of their repositories, applications, resumes

Third-party data handling
- When importing jobs, store only public job metadata and the original link
- Do not store scraped applicant data from other sites

Vulnerabilities & hardening
- Use parameterized queries via Prisma to prevent SQL injection
- Sanitize HTML in job descriptions (use DOMPurify) to avoid XSS
- Validate and limit uploaded file types and size for resumes

Compliance
- For GDPR/CCPA-like considerations: provide data export and deletion, data processing details

CI checks
- Add security linters and secret scanning in CI (detect accidental token commits)

Incident response
- Document incident process: revoke secrets, notify users, rollback, root cause analysis


