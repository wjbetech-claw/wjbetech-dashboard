-- Add featured_repos table and seed data

CREATE TABLE IF NOT EXISTS featured_repos (
  id serial PRIMARY KEY,
  owner text NOT NULL,
  repo text NOT NULL,
  source text DEFAULT 'manual',
  created_at timestamptz DEFAULT now(),
  UNIQUE(owner, repo)
);

-- Seed initial featured repos (wjbetech and wjbetech-claw)
INSERT INTO featured_repos (owner, repo, source) VALUES
  ('wjbetech', 'wjbetech-dashboard', 'seed'),
  ('wjbetech-claw', 'wjbetech-dashboard', 'seed')
ON CONFLICT (owner, repo) DO NOTHING;
