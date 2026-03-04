import request from 'supertest'
import express from 'express'
import nock from 'nock'

import featuredRouter from '../../src/routes/api/featuredRepos'
import activitiesRouter from '../../src/routes/api/repoActivities'
import prRouter from '../../src/routes/api/prTracking'

import db from '../../src/db'

// Note: These are integration-style tests that exercise the routes against
// mocked GitHub API responses using nock and a test DB mock.

jest.mock('../../src/db')

function createApp() {
  const app = express()
  app.use(express.json())
  app.use('/api/featured', featuredRouter)
  app.use('/api/repo-activities', activitiesRouter)
  app.use('/api/pr-tracking', prRouter)
  return app
}

describe('Integration: GitHub-backed endpoints', () => {
  const app = createApp()

  beforeAll(() => {
    // Mock DB query for featured repos
    (db.query as any).mockResolvedValue({ rows: [{ owner: 'wjbetech', repo: 'wjbetech-dashboard', description: 'x', url: 'u', is_active: true }] })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  test('GET /api/repo-activities uses GitHub endpoints', async () => {
    // Mock commits, pulls, issues endpoints
    nock('https://api.github.com')
      .get(/repos\/wjbetech\/wjbetech-dashboard\/commits/)
      .reply(200, [{ sha: 'abc' }])
    nock('https://api.github.com')
      .get(/repos\/wjbetech\/wjbetech-dashboard\/pulls/)
      .reply(200, [{ id: 1, title: 'PR' }])
    nock('https://api.github.com')
      .get(/repos\/wjbetech\/wjbetech-dashboard\/issues/)
      .reply(200, [{ id: 2, title: 'Issue' }])

    const res = await request(app).get('/api/repo-activities/wjbetech/wjbetech-dashboard')
    expect(res.status).toBe(200)
    expect(res.body.commits.length).toBeGreaterThan(0)
  })

  test('GET /api/pr-tracking lists org repos and fetches PRs', async () => {
    nock('https://api.github.com')
      .get(/orgs\/wjbetech\/repos/)
      .reply(200, [{ name: 'repo1', owner: { login: 'wjbetech' } }])
    nock('https://api.github.com')
      .get(/repos\/wjbetech\/repo1\/pulls/)
      .reply(200, [{ id: 10 }])

    const res = await request(app).get('/api/pr-tracking/wjbetech')
    expect(res.status).toBe(200)
    expect(res.body.prs.length).toBeGreaterThan(0)
  })

  test('GET /api/featured reads from DB', async () => {
    const res = await request(app).get('/api/featured')
    expect(res.status).toBe(200)
    expect(res.body[0].repo).toBe('wjbetech-dashboard')
  })
})
