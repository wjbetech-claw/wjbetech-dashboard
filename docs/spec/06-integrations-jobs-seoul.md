Job Integrations — Sources and Compliance

Sources (free and permissive)
- GitHub Jobs mirror / community feeds (note: GitHub Jobs deprecated; use community mirrors or aggregate via public company postings)
- Company career pages (Lever, Greenhouse) — use public postings endpoints when available
- CSV import: allow users to upload job lists from any source

Scraping & compliance
- Prefer official APIs and public RSS/feed endpoints
- If scraping company pages, respect robots.txt and terms of service; implement rate limiting and caching
- Store only job metadata required for listing and applying; do not store personal applicant data from scraped sources

Normalization
- Normalize job fields: title, company, location, remote, description, tags, posted_at
- Extract structured tags from description where possible (languages, role level)

Update cadence
- Poll job sources every 30–60 minutes or on-demand on user import
- Allow users to re-run import manually

Attribution
- Keep a link to the original job posting and source metadata (source, source_id, raw_payload)

Fallbacks
- If official API not available, accept CSV import with mapping UI for users to map columns

Testing
- Provide a set of sample CSVs and mocked API responses for development


