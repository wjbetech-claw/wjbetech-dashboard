import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Navbar from '../navbar'

expect.extend(toHaveNoViolations)

// Simple render; Navbar should be lightweight
test('Navbar should have no basic accessibility violations', async ()=>{
  const { container } = render(<Navbar />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
