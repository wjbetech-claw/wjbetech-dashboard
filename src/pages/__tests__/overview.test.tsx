import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Overview from '../overview'

beforeEach(()=>{
  // @ts-ignore
  global.fetch = jest.fn((url)=>{
    if(url.includes('/api/featured')){
      return Promise.resolve({ ok:true, json: ()=>Promise.resolve([{ id:1, owner:'wjbetech', repo:'wjbetech-dashboard', full_name:'wjbetech/wjbetech-dashboard', url:'https://github.com/wjbetech/wjbetech-dashboard' }]) })
    }
    if(url.includes('/api/active-job')){
      return Promise.resolve({ ok:true, json: ()=>Promise.resolve({ job: { id:2, title:'Deploy thing', repo_full_name:'wjbetech/wjbetech-dashboard', updated_at: new Date().toISOString() } }) })
    }
    return Promise.resolve({ ok:false, json: ()=>Promise.resolve({}) })
  })
})

afterEach(()=>{
  // @ts-ignore
  global.fetch.mockRestore()
})

test('renders overview with featured repos and active job', async ()=>{
  render(<Overview />)
  expect(screen.getByText(/Overview/)).toBeInTheDocument()
  await waitFor(()=>expect(screen.getByText(/wjbetech\/wjbetech-dashboard/)).toBeInTheDocument())
  expect(screen.getByText(/Deploy thing/)).toBeInTheDocument()
})
