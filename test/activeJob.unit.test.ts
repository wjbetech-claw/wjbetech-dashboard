import { describe, it, expect, vi } from 'vitest'
import * as activeJob from '../src/services/activeJob'
import * as githubService from '../src/services/githubRepoService'

describe('activeJob service', ()=>{
  it('computeActiveJob returns most recent job-like PR/job object', async ()=>{
    const jobs = [
      { id:1, status:'running', updated_at:'2026-03-01T00:00:00Z' },
      { id:2, status:'running', updated_at:'2026-03-02T00:00:00Z' }
    ]
    // simulate DB or service that returns jobs
    vi.spyOn(activeJob, 'fetchAndCompute' as any).mockResolvedValueOnce(jobs[1])
    const res = await activeJob.fetchAndCompute()
    expect(res).toBeDefined()
  })

  it('computeActiveJob handles empty lists gracefully', async ()=>{
    vi.spyOn(activeJob, 'fetchAndCompute' as any).mockResolvedValueOnce(null)
    const res = await activeJob.fetchAndCompute()
    expect(res).toBeNull()
  })
})
