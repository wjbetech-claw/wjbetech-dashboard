import { query } from './index'

export async function upsertPR(p: { pr_id: number; repo_id: number; number: number; title?: string; author?: string; state?: string; merged?: boolean; url?: string }){
  const q = `INSERT INTO pull_requests (pr_id, repo_id, number, title, author, state, merged, url, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,now(),now()) ON CONFLICT (pr_id) DO UPDATE SET title=EXCLUDED.title, author=EXCLUDED.author, state=EXCLUDED.state, merged=EXCLUDED.merged, url=EXCLUDED.url, updated_at=now()`
  await query(q, [p.pr_id, p.repo_id, p.number, p.title, p.author, p.state, p.merged, p.url])
}
