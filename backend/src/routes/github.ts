import { Router } from 'express'
const router = Router()

// GET /api/github/featured
router.get('/featured', async (req, res) => {
  // TODO: wire to githubService -> fetch featured repos from DB
  res.json({ featured: [] })
})

// GET /api/github/repos/:owner/:repo/activities
router.get('/repos/:owner/:repo/activities', async (req, res) => {
  const { owner, repo } = req.params
  // TODO: call service to fetch activities
  res.json({ owner, repo, activities: [] })
})

// GET /api/github/orgs/:org/prs
router.get('/orgs/:org/prs', async (req, res) => {
  const { org } = req.params
  // TODO: call service to list org PRs
  res.json({ org, prs: [] })
})

export default router
