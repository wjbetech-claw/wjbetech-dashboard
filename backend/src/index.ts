import express from 'express'
import dotenv from 'dotenv'
import { startSyncWorker } from './workers/syncWorker'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`Backend listening on :${port}`)
  startSyncWorker()
})
