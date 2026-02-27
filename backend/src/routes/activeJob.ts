import { Router } from 'express'
import { computeActiveJob } from '../services/activeJob'

export const activeJobRouter = Router()

activeJobRouter.get('/', (_req, res) => {
  res.json(computeActiveJob())
})

activeJobRouter.post('/recompute', (_req, res) => {
  res.json(computeActiveJob())
})
