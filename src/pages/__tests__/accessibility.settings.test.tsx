import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import SettingsPage from '../settings'

expect.extend(toHaveNoViolations)

// Mock fetch or any hooks inside Settings if necessary
// @ts-ignore
global.fetch = global.fetch || vi.fn(() => Promise.resolve({ ok:true, json: ()=>Promise.resolve({}) }))

test('Settings page should have no basic accessibility violations', async ()=>{
  const { container } = render(<SettingsPage />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
