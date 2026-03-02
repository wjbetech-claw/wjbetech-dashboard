import request from 'supertest'
import app from '../../backend/src/index'
import { vi, describe, it, beforeEach, expect } from 'vitest'
import * as octo from '../../backend/src/services/octokit'

beforeEach(()=>{ vi.restoreAllMocks(); octo.clearCache() })

describe('GET /api/github/featured', ()=>{
  it('returns enriched repos', async ()=>{
    // mock db
    const db = await import('../../backend/src/db')
    vi.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ owner: 'wjbetech', repo: 'dashboard' }] } as any)
    const fakeOcto = { repos: { get: vi.fn().mockResolvedValueOnce({ data: { id:1,name:'dashboard',full_name:'wjbetech/dashboard',html_url:'https://github.com/wjbetech/dashboard' } }) } }
    vi.spyOn(octo,'createOctokit').mockReturnValueOnce(fakeOcto as any)

    const res = await request(app).get('/api/github/featured')
    expect(res.status).toBe(200)
    expect(res.body.repos).toBeInstanceOf(Array)
    expect(res.body.repos[0].full_name).toBe('wjbetech/dashboard')
  })
})
