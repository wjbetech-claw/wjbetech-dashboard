import express from 'express'
import dotenv from 'dotenv'
import { startSyncWorker } from './workers/syncWorker'

dotenv.config()
const app = express()
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
<<<<<<< HEAD
  console.log(`Backend listening on :${port}`)
  startSyncWorker()
=======
  console.log(`Backend listening on :${port}`)
  startSyncWorker()
>>>>>>> ed918ad5d (feat(backend): add GitHub integration and sync worker (#43))
})
