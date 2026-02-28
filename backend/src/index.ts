import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.get('/health', (_req, res) => {
  res.json({status: 'ok', time: new Date().toISOString()})
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on ${port}`)
})

export default app
