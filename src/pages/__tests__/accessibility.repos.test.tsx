import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import ReposPage from '../repos'

expect.extend(toHaveNoViolations)

// Mock fetch to return empty featured list so component renders safely
// @ts-ignore
global.fetch = vi.fn((url)=>{
  if(url.includes('/api/featured')){
    return Promise.resolve({ ok:true, json: ()=>Promise.resolve([]) })
  }
  return Promise.resolve({ ok:false, json: ()=>Promise.resolve({}) })
})

// Mock DndContext to avoid drag handlers during render
vi.mock('@dnd-kit/core', ()=>({
  DndContext: ({children}: any)=> React.createElement('div', null, children)
}))

test('Repos page should have no basic accessibility violations', async ()=>{
  const { container } = render(<ReposPage />)
  await waitFor(()=>{})
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
