import { Router } from 'express'
import { cachedRequest } from '../../services/octokitService'

const router = Router()

// GET /api/pr-tracking/:org - list PRs across org (recent)
router.get('/:org', async (req, res) => {
  const { org } = req.params
  try {
    // List repos for org, then fetch recent PRs for each (limited)
    const repos = await cachedRequest('GET', '/orgs/{org}/repos', { org, per_page: 50 }, 60 * 1000)
    const promises = repos.map((r: any) => cachedRequest('GET', '/repos/{owner}/{repo}/pulls', { owner: r.owner.login, repo: r.name, per_page: 5, state: 'all' }, 30 * 1000))
    const prsByRepo = await Promise.all(promises)
    res.json({ repos: repos.map((r: any) => ({ owner: r.owner.login, repo: r.name })), prs: prsByRepo })
  } catch (err) {
    console.error('prTracking error', err)
    res.status(500).json({ error: 'failed to load PR tracking' })
  }
})

export default router
