import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import ReposPage from '../repos'

expect.extend(toHaveNoViolations)

test('Repos page should have no basic accessibility violations', async ()=>{
  const { container } = render(<ReposPage />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
