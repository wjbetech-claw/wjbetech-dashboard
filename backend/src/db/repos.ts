import { query } from './index'

export async function upsertRepo(r: { repo_id: number; name: string; full_name: string; url?: string }){
  const q = `INSERT INTO repos (repo_id, name, full_name, url, updated_at) VALUES ($1,$2,$3,$4,now()) ON CONFLICT (repo_id) DO UPDATE SET name=EXCLUDED.name, full_name=EXCLUDED.full_name, url=EXCLUDED.url, updated_at=now()`
  await query(q, [r.repo_id, r.name, r.full_name, r.url])
}

export async function listRepos(){
  const res = await query('SELECT * FROM repos ORDER BY updated_at DESC')
  return res.rows
}
