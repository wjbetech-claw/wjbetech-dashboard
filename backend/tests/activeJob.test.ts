import { describe, it, expect } from 'vitest'
import { computeActiveJob } from '../src/services/activeJob'

describe('computeActiveJob', () => {
  it('returns highest confidence candidate', () => {
    const job = computeActiveJob()
    expect(job.confidence).toBe(0.9)
    expect(job.kind).toBe('pr')
  })
})
