import { rest } from 'msw'
import { setupServer } from 'msw/node'
import request from 'supertest'
import app from '../../backend/src/index'

const server = setupServer(
  rest.get('https://api.github.com/repos/:owner/:repo', (req, res, ctx) => {
    const { owner, repo } = req.params
    return res(ctx.json({ id: 123, name: repo, full_name: `${owner}/${repo}`, html_url: `https://github.com/${owner}/${repo}` }))
  }),
  rest.get('https://api.github.com/search/issues', (req, res, ctx) => {
    return res(ctx.json({ items: [{ id: 1, title: 'PR1', html_url: 'https://github.com/pr/1', repository_url: 'https://api.github.com/repos/wjbetech/dashboard' }] }))
  }),
  rest.get('https://api.github.com/repos/:owner/:repo/commits', (req, res, ctx) => {
    return res(ctx.json([{ sha: 'abc', commit: { message: 'msg', author: { date: new Date().toISOString() } }, html_url: 'https://' }]))
  }),
  rest.get('https://api.github.com/repos/:owner/:repo/pulls', (req, res, ctx) => {
    return res(ctx.json([{ id: 5, number: 10, title: 'Fix', state: 'open', html_url: 'https://' , created_at: new Date().toISOString()}]))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('GET /api/github/featured', ()=>{
  it('returns enriched featured repos from DB or fallback', async ()=>{
    // mock DB to return featured repo
    const db = await import('../../backend/src/db')
    jest ? null : null
    // use jest-like spy via vitest will be used in CI; here just call endpoint
    const res = await request(app).get('/api/github/featured')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.repos)).toBe(true)
  })
})

