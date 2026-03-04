import { Router } from 'express'
import { cachedRequest } from '../../services/octokitService'

const router = Router()

// GET /api/repo-activities/:owner/:repo - fetch recent activities (commits, issues, prs)
router.get('/:owner/:repo', async (req, res) => {
  const { owner, repo } = req.params
  try {
    const commits = await cachedRequest('GET', '/repos/{owner}/{repo}/commits', { owner, repo }, 30 * 1000)
    const prs = await cachedRequest('GET', '/repos/{owner}/{repo}/pulls', { owner, repo, per_page: 10, state: 'all' }, 30 * 1000)
    const issues = await cachedRequest('GET', '/repos/{owner}/{repo}/issues', { owner, repo, per_page: 10, state: 'all' }, 30 * 1000)
    res.json({ commits, pulls: prs, issues })
  } catch (err) {
    console.error('repoActivities error', err)
    res.status(500).json({ error: 'failed to load repo activities' })
  }
})

export default router
