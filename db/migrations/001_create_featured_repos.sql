-- Migration: create featured_repos table
CREATE TABLE IF NOT EXISTS featured_repos (
  id SERIAL PRIMARY KEY,
  owner TEXT NOT NULL,
  repo TEXT NOT NULL,
  description TEXT,
  added_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Seed example entries (idempotent)
INSERT INTO featured_repos (owner, repo, description, added_by)
SELECT 'wjbetech', 'wjbetech', 'Primary repo for dashboard', 'agent'
WHERE NOT EXISTS (
  SELECT 1 FROM featured_repos WHERE owner='wjbetech' AND repo='wjbetech'
);

INSERT INTO featured_repos (owner, repo, description, added_by)
SELECT 'wjbetech', 'wjbetech-claw', 'Companion claw repo', 'agent'
WHERE NOT EXISTS (
  SELECT 1 FROM featured_repos WHERE owner='wjbetech' AND repo='wjbetech-claw'
);
