// Active job detection scaffold
import { Pool } from 'pg';

export function computeActiveJob(rows: any[]) {
  // Placeholder heuristic: pick the job with the most recent 'updated_at'
  if (!rows || rows.length === 0) return null;
  return rows.reduce((best: any, cur: any) => {
    if (!best) return cur;
    return new Date(cur.updated_at) > new Date(best.updated_at) ? cur : best;
  }, null);
}

export async function fetchAndCompute(pool: Pool) {
  const res = await pool.query('SELECT * FROM jobs ORDER BY updated_at DESC LIMIT 10');
  return computeActiveJob(res.rows);
}

export default { computeActiveJob, fetchAndCompute };
