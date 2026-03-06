import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { MemoryRouter } from 'react-router'
import Navbar from '../navbar'

expect.extend(toHaveNoViolations)

// Simple render inside a Router; Navbar uses react-router Link
test('Navbar should have no basic accessibility violations', async ()=>{
  const { container } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
