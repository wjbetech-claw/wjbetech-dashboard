-- 001_create_featured_repos.sql
-- Create featured_repos table to store repos highlighted on the dashboard

BEGIN;

CREATE TABLE IF NOT EXISTS featured_repos (
  id SERIAL PRIMARY KEY,
  owner TEXT NOT NULL,
  repo TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- optional unique constraint to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS featured_repos_owner_repo_idx ON featured_repos(owner, repo);

COMMIT;
