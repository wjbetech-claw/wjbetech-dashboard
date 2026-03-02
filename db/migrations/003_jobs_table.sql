-- migration: create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL PRIMARY KEY,
  repo_full_name TEXT,
  title TEXT,
  description TEXT,
  status VARCHAR(64) DEFAULT 'todo',
  assignee TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
