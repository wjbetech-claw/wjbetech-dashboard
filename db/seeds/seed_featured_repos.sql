-- seed_featured_repos.sql
-- Insert initial featured repos (wjbetech family)

INSERT INTO featured_repos (owner, repo, description, url, is_active)
VALUES
  ('wjbetech', 'wjbetech-dashboard', 'Dashboard for wjbetech projects and CI insight', 'https://github.com/wjbetech/wjbetech-dashboard', TRUE)
ON CONFLICT (owner, repo) DO NOTHING;

INSERT INTO featured_repos (owner, repo, description, url, is_active)
VALUES
  ('wjbetech', 'wjbetech-claw', 'OpenClaw integration adapters and helpers', 'https://github.com/wjbetech/wjbetech-claw', TRUE)
ON CONFLICT (owner, repo) DO NOTHING;
