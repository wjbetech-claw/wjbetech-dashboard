-- migration: create featured_repos table
CREATE TABLE IF NOT EXISTS featured_repos (
  id SERIAL PRIMARY KEY,
  owner VARCHAR(255) NOT NULL,
  repo VARCHAR(255) NOT NULL,
  featured BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- seed initial entries (wjbetech & wjbetech-claw)
INSERT INTO featured_repos (owner, repo, featured) VALUES
('wjbetech', 'dashboard', true),
('wjbetech-claw', 'wjbetech-dashboard', true)
ON CONFLICT DO NOTHING;
