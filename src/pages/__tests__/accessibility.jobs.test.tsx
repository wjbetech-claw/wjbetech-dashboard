import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import JobsPage from '../jobs'

expect.extend(toHaveNoViolations)

test('Jobs page should have no basic accessibility violations', async ()=>{
  const { container } = render(<JobsPage />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
