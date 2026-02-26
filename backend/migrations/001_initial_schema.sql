-- Initial schema for wjbetech-dashboard

-- Repos
CREATE TABLE repos (
  id VARCHAR(255) PRIMARY KEY,
  owner VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  description TEXT,
  default_branch VARCHAR(255),
  private BOOLEAN DEFAULT FALSE,
  archived BOOLEAN DEFAULT FALSE,
  url VARCHAR(2048) NOT NULL,
  last_commit_sha VARCHAR(255),
  last_commit_at TIMESTAMP,
  open_pr_count INT DEFAULT 0,
  workflow_count INT DEFAULT 0,
  health VARCHAR(50) DEFAULT 'unknown',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Pull Requests
CREATE TABLE pull_requests (
  id VARCHAR(255) PRIMARY KEY,
  repo_id VARCHAR(255) NOT NULL REFERENCES repos(id),
  repo_full_name VARCHAR(255) NOT NULL,
  number INT NOT NULL,
  title VARCHAR(1024) NOT NULL,
  author VARCHAR(255) NOT NULL,
  branch VARCHAR(255) NOT NULL,
  base_branch VARCHAR(255) NOT NULL,
  state VARCHAR(50) NOT NULL,
  review_state VARCHAR(50) DEFAULT 'none',
  labels TEXT[] DEFAULT '{}',
  draft BOOLEAN DEFAULT FALSE,
  additions INT DEFAULT 0,
  deletions INT DEFAULT 0,
  changed_files INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  commits_count INT DEFAULT 0,
  html_url VARCHAR(2048) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  closed_at TIMESTAMP,
  merged_at TIMESTAMP,
  UNIQUE(repo_id, number)
);

-- Workflows
CREATE TABLE workflow_runs (
  id VARCHAR(255) PRIMARY KEY,
  repo_id VARCHAR(255) NOT NULL REFERENCES repos(id),
  repo_full_name VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  branch VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  conclusion VARCHAR(50),
  actor VARCHAR(255) NOT NULL,
  commit_sha VARCHAR(255) NOT NULL,
  commit_message TEXT,
  run_number INT NOT NULL,
  html_url VARCHAR(2048) NOT NULL,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  duration_ms INT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

-- Jobs
CREATE TABLE job_listings (
  id VARCHAR(255) PRIMARY KEY,
  external_id VARCHAR(255),
  source VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  remote BOOLEAN DEFAULT FALSE,
  employment_type VARCHAR(50),
  salary_min INT,
  salary_max INT,
  salary_currency VARCHAR(10),
  url VARCHAR(2048) NOT NULL,
  posted_at TIMESTAMP,
  discovered_at TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'discovered',
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(source, external_id)
);

-- Active Job
CREATE TABLE active_jobs (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  kind VARCHAR(50) NOT NULL,
  source VARCHAR(50) NOT NULL,
  confidence FLOAT DEFAULT 0,
  signal TEXT NOT NULL,
  repo_id VARCHAR(255) REFERENCES repos(id),
  repo_full_name VARCHAR(255),
  related_pr_id VARCHAR(255) REFERENCES pull_requests(id),
  related_issue_id VARCHAR(255),
  related_kanban_card_id VARCHAR(255),
  url VARCHAR(2048),
  updated_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_repos_owner ON repos(owner);
CREATE INDEX idx_prs_repo_state ON pull_requests(repo_id, state);
CREATE INDEX idx_prs_updated ON pull_requests(updated_at DESC);
CREATE INDEX idx_workflows_repo ON workflow_runs(repo_id);
CREATE INDEX idx_jobs_status ON job_listings(status);
CREATE INDEX idx_jobs_source ON job_listings(source);
