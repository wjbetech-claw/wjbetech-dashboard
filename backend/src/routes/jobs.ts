import { Router } from 'express'

export const jobsRouter = Router()

jobsRouter.get('/', (_req, res) => {
  res.json({ jobs: [{ id: 'j1', title: 'Platform Engineer', company: 'Nimbus', status: 'saved' }] })
})
