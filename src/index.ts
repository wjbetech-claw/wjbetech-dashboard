import express from 'express'
import fs from 'fs'
import path from 'path'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 3000

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

app.get('/', (_req, res) => {
  res.send('wjbetech-dashboard backend')
})

async function loadOptionalRouter(relPath: string) {
  const fullPathTs = path.join(process.cwd(), 'src', relPath + '.ts')
  const fullPathJs = path.join(process.cwd(), 'dist', relPath + '.js')
  try {
    if (fs.existsSync(fullPathTs)) {
      const url = `file://${fullPathTs}`
      const mod = await import(url)
      return mod.default
    }
    if (fs.existsSync(fullPathJs)) {
      const url = `file://${fullPathJs}`
      const mod = await import(url)
      return mod.default
    }
  } catch (err) {
    console.warn('failed to import', relPath, err)
    return null
  }
  return null
}

(async function main(){
  // Conditionally mount routers if their files exist
  const featured = await loadOptionalRouter('routes/api/featuredRepos')
  if (featured) app.use('/api/featured', featured)

  const activities = await loadOptionalRouter('routes/api/repoActivities')
  if (activities) app.use('/api/repo-activities', activities)

  const prTracking = await loadOptionalRouter('routes/api/prTracking')
  if (prTracking) app.use('/api/pr-tracking', prTracking)

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${port}`)
  })
})()
