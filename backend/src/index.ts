import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on ${port}`)
})
