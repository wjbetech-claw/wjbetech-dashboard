import { describe, it, expect, vi } from 'vitest'
import * as githubService from '../src/services/githubRepoService'
import * as client from '../src/services/githubClient'

describe('githubRepoService', ()=>{
  it('fetchFeaturedRepos returns top 5 by stars', async ()=>{
    const repos = [
      { name: 'a', stargazers_count: 1 },
      { name: 'b', stargazers_count: 5 },
      { name: 'c', stargazers_count: 3 },
      { name: 'd', stargazers_count: 4 },
      { name: 'e', stargazers_count: 2 },
      { name: 'f', stargazers_count: 6 }
    ]
    vi.spyOn(client, 'request').mockResolvedValue({ data: repos })
    const res = await githubService.fetchFeaturedRepos('someone')
    expect(res.length).toBe(5)
    // first should be highest stars
    expect(res[0].name).toBe('f')
  })

  it('fetchRepoActivities returns events array', async ()=>{
    const events = [{ id:1, type:'PushEvent' }]
    vi.spyOn(client, 'request').mockResolvedValue({ data: events })
    const res = await githubService.fetchRepoActivities('o','r')
    expect(res).toEqual(events)
  })

  it('fetchPRTracking enriches PRs with status', async ()=>{
    const prs = [{ number:1, title:'P', head: { sha: 'sha1' }, html_url: 'u', user:{login:'u'} }]
    vi.spyOn(client, 'request')
      .mockResolvedValueOnce({ data: prs })
      .mockResolvedValueOnce({ data: { state: 'success' } })
    const res = await githubService.fetchPRTracking('o','r')
    expect(Array.isArray(res)).toBe(true)
    expect(res[0].number).toBe(1)
    expect(res[0].status).toBeDefined()
  })
})
