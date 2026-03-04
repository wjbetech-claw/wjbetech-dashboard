import request from 'supertest'
import express from 'express'

import featuredRouter from '../src/routes/api/featuredRepos'
import activitiesRouter from '../src/routes/api/repoActivities'
import prRouter from '../src/routes/api/prTracking'

// Mock db and octokitService
jest.mock('../src/db', () => ({
  query: jest.fn().mockResolvedValue({ rows: [{ owner: 'wjbetech', repo: 'wjbetech-dashboard', description: 'x', url: 'u', is_active: true }] })
}))

jest.mock('../src/services/octokitService', () => ({
  cachedRequest: jest.fn(async (method: any, url: string, params: any) => {
    if (url.includes('/commits')) return [{ sha: 'abc' }]
    if (url.includes('/pulls')) return [{ id: 1, title: 'PR' }]
    if (url.includes('/issues')) return [{ id: 2, title: 'Issue' }]
    if (url.includes('/orgs')) return [{ name: 'repo1', owner: { login: 'org' } }]
    return []
  }),
}))

// Simple app mounting the routers
function createApp() {
  const app = express()
  app.use(express.json())
  app.use('/api/featured', featuredRouter)
  app.use('/api/repo-activities', activitiesRouter)
  app.use('/api/pr-tracking', prRouter)
  return app
}

describe('API routes', () => {
  const app = createApp()

  test('GET /api/featured returns featured repos', async () => {
    const res = await request(app).get('/api/featured')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBeTruthy()
    expect(res.body[0].repo).toBe('wjbetech-dashboard')
  })

  test('GET /api/repo-activities/:owner/:repo returns commits, pulls, issues', async () => {
    const res = await request(app).get('/api/repo-activities/wjbetech/wjbetech-dashboard')
    expect(res.status).toBe(200)
    expect(res.body.commits).toBeDefined()
    expect(res.body.pulls).toBeDefined()
    expect(res.body.issues).toBeDefined()
  })

  test('GET /api/pr-tracking/:org returns repos and prs', async () => {
    const res = await request(app).get('/api/pr-tracking/wjbetech')
    expect(res.status).toBe(200)
    expect(res.body.repos).toBeDefined()
    expect(res.body.prs).toBeDefined()
  })
})
