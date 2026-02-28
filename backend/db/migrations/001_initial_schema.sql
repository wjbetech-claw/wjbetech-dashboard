-- 001_initial_schema.sql
-- Initial schema for WJBetech dashboard

BEGIN;

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  github_id text,
  email text,
  name text,
  avatar_url text,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS repos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  github_id bigint,
  owner text,
  name text,
  full_name text,
  description text,
  primary_language text,
  stars int DEFAULT 0,
  forks int DEFAULT 0,
  last_commit_at timestamptz,
  metadata jsonb DEFAULT '{}',
  synced_at timestamptz
);

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text,
  source_id text,
  title text,
  company_name text,
  location text,
  remote boolean DEFAULT false,
  description text,
  tags jsonb DEFAULT '[]',
  posted_at timestamptz,
  raw_payload jsonb,
  imported_by uuid REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_jobs_title_company ON jobs USING gin (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(company_name,'')));

COMMIT;
