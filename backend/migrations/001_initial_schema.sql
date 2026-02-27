-- 001_initial_schema.sql

CREATE TABLE IF NOT EXISTS repos (
  id SERIAL PRIMARY KEY,
  repo_id BIGINT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  url TEXT,
  status TEXT,
  open_prs INT DEFAULT 0,
  workflows INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pull_requests (
  id SERIAL PRIMARY KEY,
  pr_id BIGINT UNIQUE NOT NULL,
  repo_id BIGINT NOT NULL,
  number INT NOT NULL,
  title TEXT,
  author TEXT,
  state TEXT,
  merged BOOLEAN DEFAULT false,
  url TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  FOREIGN KEY (repo_id) REFERENCES repos(repo_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS workflows (
  id SERIAL PRIMARY KEY,
  workflow_id BIGINT UNIQUE NOT NULL,
  repo_id BIGINT NOT NULL,
  name TEXT,
  status TEXT,
  run_count INT DEFAULT 0,
  last_run_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (repo_id) REFERENCES repos(repo_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS job_listings (
  id SERIAL PRIMARY KEY,
  source TEXT NOT NULL,
  external_id TEXT NOT NULL,
  title TEXT,
  company TEXT,
  location TEXT,
  url TEXT,
  status TEXT,
  fetched_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (source, external_id)
);

CREATE TABLE IF NOT EXISTS sync_logs (
  id SERIAL PRIMARY KEY,
  kind TEXT NOT NULL,
  detail JSONB,
  success BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
