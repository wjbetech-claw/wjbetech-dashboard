import { describe, it, expect, beforeEach } from 'vitest'
import { cached, clearCache } from '../../backend/src/services/octokit'

describe('octokit cached helper', ()=>{
  beforeEach(()=>{ clearCache() })

  it('caches results for ttl', async ()=>{
    let called = 0
    const fn = async ()=>{ called++; return { v: Math.random() } }
    const a = await cached('k1', fn, 500)
    const b = await cached('k1', fn, 500)
    expect(called).toBe(1)
    expect(a).toEqual(b)
  })

  it('expires cache after ttl', async ()=>{
    let called = 0
    const fn = async ()=>{ called++; return { v: Math.random() } }
    const a = await cached('k2', fn, 10)
    await new Promise(r=>setTimeout(r,20))
    const b = await cached('k2', fn, 10)
    expect(called).toBe(2)
  })
})
