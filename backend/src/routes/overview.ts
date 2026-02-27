import { Router } from 'express'

export const overviewRouter = Router()

overviewRouter.get('/', (_req, res) => {
  res.json({
    systemHealth: { status: 'green', message: 'All systems operational' },
    deployments: { completed24h: 18, inProgress: 2 },
    activeFocus: { title: 'Polish dashboard UI', eta: 'Today' },
  })
})
