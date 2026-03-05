import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Overview from '../overview'

expect.extend(toHaveNoViolations)

test('Overview page should have no basic accessibility violations', async ()=>{
  const { container } = render(<Overview />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
