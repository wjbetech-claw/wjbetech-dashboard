import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as octo from '../backend/src/services/octokit'
import * as githubService from '../backend/src/services/githubService'

beforeEach(()=>{
  vi.restoreAllMocks()
  octo.clearCache()
})

describe('githubService.getFeaturedRepos', ()=>{
  it('returns enriched repo data from DB rows via octokit', async ()=>{
    // mock DB query to return one featured repo
    const db = await import('../backend/src/db')
    vi.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ owner: 'wjbetech', repo: 'dashboard' }] } as any)

    // mock createOctokit and repos.get
    const fakeOcto = { repos: { get: vi.fn().mockResolvedValueOnce({ data: { id: 1, name: 'dashboard', full_name: 'wjbetech/dashboard', html_url: 'https://github.com/wjbetech/dashboard' } }) } }
    vi.spyOn(octo, 'createOctokit').mockReturnValueOnce(fakeOcto as any)

    const res = await githubService.getFeaturedRepos()
    expect(res).toBeInstanceOf(Array)
    expect(res[0].full_name).toBe('wjbetech/dashboard')
  })
})

describe('githubService.getOrgPRs', ()=>{
  it('uses octokit search and returns list', async ()=>{
    const fakeItems = [{ id: 10, title: 'PR1', html_url: 'https://', repository_url: 'https://api.github.com/repos/wjbetech/dashboard' }]
    const fakeOcto = { search: { issuesAndPullRequests: vi.fn().mockResolvedValueOnce({ data: { items: fakeItems } }) } }
    vi.spyOn(octo, 'createOctokit').mockReturnValueOnce(fakeOcto as any)

    const prs = await githubService.getOrgPRs('wjbetech', 1)
    expect(prs).toBeInstanceOf(Array)
    expect(prs[0].title).toBe('PR1')
  })
})

describe('githubService.getRepoActivities', ()=>{
  it('returns commits, prs, and jobs (jobs may be empty)', async ()=>{
    const fakeCommits = [{ sha: 'abc', commit: { message: 'm', author: { date: '2026-01-01' } }, html_url: 'https://' }]
    const fakePRs = [{ id:1, number:2, title:'t', state:'open', html_url:'https://', created_at: '2026-01-01' }]
    const fakeOcto = { repos: { listCommits: vi.fn().mockResolvedValueOnce({ data: fakeCommits }) }, pulls: { list: vi.fn().mockResolvedValueOnce({ data: fakePRs }) } }
    vi.spyOn(octo, 'createOctokit').mockReturnValueOnce(fakeOcto as any)

    // mock DB query for jobs to return empty
    const db = await import('../backend/src/db')
    vi.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] } as any)

    const out = await githubService.getRepoActivities('wjbetech','dashboard')
    expect(out).toHaveProperty('commits')
    expect(out).toHaveProperty('prs')
    expect(out).toHaveProperty('jobs')
  })
})
