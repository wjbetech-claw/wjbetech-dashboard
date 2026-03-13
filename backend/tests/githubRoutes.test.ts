import request from 'supertest'
import app from '../src/index'

describe('GitHub routes', () => {
  test('GET /api/github/featured returns featured array', async () => {
    const res = await request(app).get('/api/github/featured')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('featured')
    expect(Array.isArray(res.body.featured)).toBe(true)
  })

  test('GET /api/github/repos/:owner/:repo/activities returns activities array', async () => {
    const res = await request(app).get('/api/github/repos/wjbetech/wjbetech-claw/activities')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('activities')
    expect(Array.isArray(res.body.activities)).toBe(true)
  })

  test('GET /api/github/orgs/:org/prs returns prs array', async () => {
    const res = await request(app).get('/api/github/orgs/wjbetech/prs')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('prs')
    expect(Array.isArray(res.body.prs)).toBe(true)
  })
})
