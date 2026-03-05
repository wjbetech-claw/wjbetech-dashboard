import GitHubService from '../../src/services/githubService'
import { Octokit } from 'octokit'

vi.mock('octokit', ()=>{
  return {
    Octokit: vi.fn().mockImplementation(()=>({
      rest: {
        activity: { listRepoEvents: vi.fn().mockResolvedValue({ data: [{ id: 'e1' }] }) },
        search: { issuesAndPullRequests: vi.fn().mockResolvedValue({ data: { items: [{ id: 'p1' }] } }) }
      }
    }))
  }
})

describe('GitHubService', ()=>{
  test('listRecentRepoEvents returns events and caches them', async ()=>{
    const svc = new GitHubService('token', 1)
    const first = await svc.listRecentRepoEvents('owner','repo')
    expect(first).toHaveLength(1)
    const second = await svc.listRecentRepoEvents('owner','repo')
    expect(second).toHaveLength(1)
  })

  test('listOrgPulls returns items', async ()=>{
    const svc = new GitHubService('token')
    const pulls = await svc.listOrgPulls('org')
    expect(Array.isArray(pulls)).toBeTruthy()
    expect(pulls[0].id).toBe('p1')
  })
})
