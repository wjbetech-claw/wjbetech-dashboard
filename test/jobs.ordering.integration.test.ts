import request from 'supertest'
import { describe, it, expect } from 'vitest'

// Integration ordering tests using test bootstrap app
// eslint-disable-next-line @typescript-eslint/no-var-requires
const appModule = require('./test-app')
const app = appModule && appModule.default ? appModule.default : null

if (!app) {
  describe.skip('Jobs ordering integration (skipped)', () => { it('skipped', () => {}) })
} else {
  describe('Jobs ordering integration', () => {
    it('returns jobs ordered by position on GET /api/jobs', async () => {
      // create jobs with explicit positions
      const j1 = { repo_full_name: 'a/x', title: 'Job A', position: 100 }
      const j2 = { repo_full_name: 'a/x', title: 'Job B', position: 200 }
      const r1 = await request(app).post('/api/jobs').send(j1)
      const r2 = await request(app).post('/api/jobs').send(j2)
      expect([200,201]).toContain(r1.status)
      expect([200,201]).toContain(r2.status)

      const list = await request(app).get('/api/jobs')
      expect(list.status).toBe(200)
      const titles = list.body.map((b:any)=>b.title)
      expect(titles).toEqual(['Job A','Job B'])
    })

    it('moving a job updates ordering based on position', async () => {
      const j = { repo_full_name: 'a/x', title: 'Mover', position: 50 }
      const c = await request(app).post('/api/jobs').send(j)
      expect([200,201]).toContain(c.status)
      const id = c.body.id
      // move to position 300
      const p = await request(app).patch(`/api/jobs/${id}`).send({ position: 300 })
      expect([200,201]).toContain(p.status)
      const list = await request(app).get('/api/jobs')
      const top = list.body[list.body.length-1]
      expect(top.id).toEqual(id)
    })
  })
}
