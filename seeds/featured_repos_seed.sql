-- featured_repos_seed.sql
-- Seed initial featured repos for development

INSERT INTO featured_repos (owner, repo, description, url)
VALUES
  ('wjbetech', 'wjbetech-dashboard', 'Dashboard for wjbetech projects', 'https://github.com/wjbetech/wjbetech-dashboard'),
  ('wjbetech', 'wjbetech-claw', 'OpenClaw integrations and tooling', 'https://github.com/wjbetech/wjbetech-claw')
ON CONFLICT (owner, repo) DO NOTHING;
