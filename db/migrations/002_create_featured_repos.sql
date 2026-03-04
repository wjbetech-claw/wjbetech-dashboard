-- 002_create_featured_repos.sql
-- Create featured_repos table to store repos highlighted on the Repos page

BEGIN;

CREATE TABLE IF NOT EXISTS featured_repos (
  id SERIAL PRIMARY KEY,
  owner VARCHAR(255) NOT NULL,
  repo VARCHAR(255) NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- add a uniqueness constraint on owner+repo
CREATE UNIQUE INDEX IF NOT EXISTS idx_featured_repos_owner_repo ON featured_repos(owner, repo);

COMMIT;
