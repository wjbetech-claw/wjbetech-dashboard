import express from 'express'
import dotenv from 'dotenv'
import { overviewRouter } from './routes/overview'
import { reposRouter } from './routes/repos'
import { jobsRouter } from './routes/jobs'
import { healthRouter } from './routes/health'
import { startSyncWorker } from './workers/syncWorker'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.use('/api/overview', overviewRouter)
app.use('/api/repos', reposRouter)
app.use('/api/jobs', jobsRouter)
app.use('/api/health', healthRouter)

app.listen(port, () => {
  console.log(`Backend listening on :${port}`)
  startSyncWorker()
})
