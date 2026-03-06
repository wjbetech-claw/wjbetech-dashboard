import { render, waitFor } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import MainDashboard from '../MainDashboard'

expect.extend(toHaveNoViolations)

test('dashboard has no a11y violations', async () => {
  const { container } = render(<MainDashboard />)
  await waitFor(()=>{})
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
