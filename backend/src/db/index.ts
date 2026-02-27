import pool from './pool'

export async function query(text: string, params?: any[]) {
  const res = await pool.query(text, params)
  return res
}

export default { query }
