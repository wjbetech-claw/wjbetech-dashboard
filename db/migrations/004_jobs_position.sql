-- Add position column to jobs for ordering in Kanban
ALTER TABLE jobs
ADD COLUMN IF NOT EXISTS position bigint DEFAULT (extract(epoch from now()) * 1000)::bigint;

-- Backfill existing rows with created_at timestamp as position if null
UPDATE jobs SET position = COALESCE(position, (extract(epoch from created_at) * 1000)::bigint) WHERE position IS NULL;
