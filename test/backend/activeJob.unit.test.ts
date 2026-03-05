import { computeActiveJob } from '../../backend/src/services/activeJob'

describe('computeActiveJob', ()=>{
  test('returns null for empty list', ()=>{
    expect(computeActiveJob([])).toBeNull()
  })

  test('picks the most recently updated job', ()=>{
    const rows = [
      { id:1, updated_at: '2026-01-01T00:00:00.000Z', title: 'old' },
      { id:2, updated_at: '2026-03-01T00:00:00.000Z', title: 'new' },
      { id:3, updated_at: '2026-02-01T00:00:00.000Z', title: 'mid' },
    ]
    const res = computeActiveJob(rows)
    expect(res).not.toBeNull()
    expect(res.id).toBe(2)
  })
})
