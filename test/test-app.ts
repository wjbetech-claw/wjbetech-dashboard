import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'

const app = express()
app.use(bodyParser.json())

// Try to reuse the real jobs router if it exists; otherwise, provide an in-memory test router.
const jobsRouterPath = path.resolve(__dirname, '..', 'src', 'routes', 'api', 'jobs')
let usedStub = false
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const jobsRouter = require(jobsRouterPath)
  if (jobsRouter && jobsRouter.default) {
    app.use('/api/jobs', jobsRouter.default)
  } else {
    throw new Error('jobs router not found')
  }
} catch (err) {
  usedStub = true
  // In-memory jobs store
  const jobs: any[] = []
  let nextId = 1

  app.get('/api/jobs', (_req, res) => {
    res.json(jobs)
  })

  app.post('/api/jobs', (req, res) => {
    const { repo_full_name, title, position } = req.body
    if (!repo_full_name || !title) {
      return res.status(400).json({ error: 'missing fields' })
    }
    const job = { id: nextId++, repo_full_name, title, position: typeof position !== 'undefined' ? position : Date.now(), status: 'todo', created_at: new Date().toISOString() }
    jobs.push(job)
    res.status(201).json(job)
  })

  app.patch('/api/jobs/:id', (req, res) => {
    const id = Number(req.params.id)
    const job = jobs.find((j) => j.id === id)
    if (!job) return res.status(404).json({ error: 'not found' })
    const { status, position } = req.body
    if (typeof status !== 'undefined') job.status = status
    if (typeof position !== 'undefined') job.position = position
    res.json(job)
  })
}

// Export the app and a flag indicating stub usage (helps tests)
export default app
export { usedStub }
