import { Router } from 'express'

export const reposRouter = Router()

reposRouter.get('/', (_req, res) => {
  res.json({ repos: [{ id: 'r1', name: 'wjbetech-dashboard', status: 'green', openPRs: 4, workflows: 12 }] })
})
