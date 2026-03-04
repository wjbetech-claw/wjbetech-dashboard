import { Router } from 'express'
import db from '../../db'

const router = Router()

// GET /api/featured - list featured repos from DB
router.get('/', async (_req, res) => {
  try {
    const result = await db.query('SELECT owner, repo, description, url, is_active FROM featured_repos WHERE is_active = TRUE')
    res.json(result.rows)
  } catch (err) {
    console.error('featuredRepos error', err)
    res.status(500).json({ error: 'failed to load featured repos' })
  }
})

export default router
