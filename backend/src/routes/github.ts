import express from 'express'
import githubService from '../services/githubService'

const router = express.Router()

router.get('/featured', async (req, res)=>{
  try{
    const data = await githubService.getFeaturedRepos()
    res.json({ repos: data })
  }catch(e){
    res.status(500).json({ error: 'failed' })
  }
})

router.get('/orgs/:org/prs', async (req,res)=>{
  const { org } = req.params
  const limit = parseInt((req.query.limit as string) || '5',10)
  try{
    const data = await githubService.getOrgPRs(org, limit)
    res.json({ prs: data })
  }catch(e){
    res.status(500).json({ error: 'failed' })
  }
})

router.get('/repos/:owner/:repo/activities', async (req,res)=>{
  const { owner, repo } = req.params
  try{
    const data = await githubService.getRepoActivities(owner, repo)
    res.json(data)
  }catch(e){
    res.status(500).json({ error: 'failed' })
  }
})

export default router
