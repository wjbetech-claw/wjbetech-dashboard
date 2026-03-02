import { Request, Response } from 'express'
import db from '../db'

export async function listJobs(req:Request,res:Response){
  const r = await db.query('SELECT * FROM jobs ORDER BY updated_at DESC')
  res.json({ jobs: r.rows })
}

export async function createJob(req:Request,res:Response){
  const { repo_full_name, title, description, status, assignee, position } = req.body
  // Use provided position or a monotonic fallback (ms since epoch)
  const pos = typeof position !== 'undefined' ? position : Date.now()
  const q = `INSERT INTO jobs (repo_full_name, title, description, status, assignee, position, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,now(),now()) RETURNING *`
  const r = await db.query(q, [repo_full_name, title, description, status||'todo', assignee||null, pos])
  res.status(201).json({ job: r.rows[0] })
}

export async function updateJob(req:Request,res:Response){
  const { id } = req.params
  const fields = req.body
  const sets = [] as string[]
  const vals = [] as any[]
  let i=1
  for(const k of Object.keys(fields)){
    sets.push(`${k} = $${i}`)
    vals.push((fields as any)[k])
    i++
  }
  if(sets.length===0) return res.status(400).json({ error: 'no fields' })
  const q = `UPDATE jobs SET ${sets.join(',')}, updated_at = now() WHERE id = $${i} RETURNING *`
  vals.push(id)
  const r = await db.query(q, vals)
  res.json({ job: r.rows[0] })
}

export default { listJobs, createJob, updateJob }
