import request from 'supertest'
import express from 'express'

import activeJobRouter from '../../src/routes/api/activeJob'

jest.mock('../../src/db', () => ({
  query: jest.fn()
}))
import db from '../../src/db'

function createApp(){
  const app = express()
  app.use(express.json())
  app.use('/api/active-job', activeJobRouter)
  return app
}

describe('GET /api/active-job', ()=>{
  test('returns job when present', async ()=>{
    (db.query as any).mockResolvedValue({ rows: [{ id:1, title:'Test Job', updated_at: new Date().toISOString() }] })
    const app = createApp()
    const res = await request(app).get('/api/active-job')
    expect(res.status).toBe(200)
    expect(res.body.job).toBeDefined()
    expect(res.body.job.title).toBe('Test Job')
  })

  test('returns null when no jobs', async ()=>{
    (db.query as any).mockResolvedValue({ rows: [] })
    const app = createApp()
    const res = await request(app).get('/api/active-job')
    expect(res.status).toBe(200)
    expect(res.body.job).toBeNull()
  })
})
