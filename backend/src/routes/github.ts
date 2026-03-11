// Placeholder: implement GitHub endpoints (/api/github/featured, /api/github/repos/:owner/:repo/activities, /api/github/orgs/:org/prs)
import { Router } from 'express'
const router = Router()
router.get('/featured', (req, res) => res.json({ featured: [] }))
router.get('/repos/:owner/:repo/activities', (req, res) => res.json({ activities: [] }))
router.get('/orgs/:org/prs', (req, res) => res.json({ prs: [] }))
export default router
