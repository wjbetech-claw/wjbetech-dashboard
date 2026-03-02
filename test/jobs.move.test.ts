import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { useState } from 'react'

// Move handler logic extracted for test
function computeNewStatus(current:string, dir:'left'|'right'){
  const order = ['todo','inprogress','done']
  const idx = order.indexOf(current)
  const target = dir==='left' ? Math.max(0, idx-1) : Math.min(order.length-1, idx+1)
  return order[target]
}

describe('computeNewStatus', ()=>{
  it('moves right and left correctly', ()=>{
    expect(computeNewStatus('todo','right')).toBe('inprogress')
    expect(computeNewStatus('inprogress','right')).toBe('done')
    expect(computeNewStatus('done','right')).toBe('done')
    expect(computeNewStatus('done','left')).toBe('inprogress')
  })
})
