import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import JobsPage from '../jobs'

expect.extend(toHaveNoViolations)

// Mock fetch to return empty jobs list so component renders safely
// @ts-ignore
global.fetch = vi.fn((url)=>{
  if(url.includes('/api/jobs')){
    return Promise.resolve({ ok:true, json: ()=>Promise.resolve({ jobs: [] }) })
  }
  return Promise.resolve({ ok:false, json: ()=>Promise.resolve({}) })
})

// Mock DndContext to avoid drag handlers during render
vi.mock('@dnd-kit/core', ()=>({
  DndContext: ({children}: any)=> React.createElement('div', null, children)
}))

test('Jobs page should have no basic accessibility violations', async ()=>{
  const { container } = render(<JobsPage />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
