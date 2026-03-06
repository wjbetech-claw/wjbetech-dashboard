import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Overview from '../overview'

expect.extend(toHaveNoViolations)

test('Overview page should have no basic accessibility violations', async ()=>{
  const { container } = render(<Overview />)
  // wait for potential async state updates to settle
  await waitFor(()=>{})
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
