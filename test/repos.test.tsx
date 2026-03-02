import { describe, it, expect } from 'vitest'
import { computeActiveJob } from '../backend/src/services/activeJob'

describe('computeActiveJob heuristic', ()=>{
  it('returns null for empty list', ()=>{
    expect(computeActiveJob([])).toBe(null)
  })
})
