import { Router } from 'express'
import db from '../../db'

const router = Router()

// GET /api/active-job - returns the most recently-updated job or null
router.get('/', async (_req, res) => {
  try {
    const result = await db.query('SELECT * FROM jobs ORDER BY updated_at DESC LIMIT 1')
    const job = result.rows && result.rows.length ? result.rows[0] : null
    res.json({ job })
  } catch (err) {
    console.error('activeJob error', err)
    res.status(500).json({ error: 'failed to compute active job' })
  }
})

export default router
