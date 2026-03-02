import { describe, it, expect } from 'vitest'
import { withRateLimit } from '../../backend/src/services/octokit'

describe('withRateLimit backoff', ()=>{
  it('retries on failure and eventually throws after retries', async ()=>{
    let called=0
    const fn = async ()=>{ called++; throw new Error('fail') }
    await expect(withRateLimit(fn,{retries:2,baseMs:10})).rejects.toThrow()
    expect(called).toBeGreaterThan(1)
  })
})
