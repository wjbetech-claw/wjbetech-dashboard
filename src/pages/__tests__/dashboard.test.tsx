import { render } from '@testing-library/react'
import MainDashboard from '../MainDashboard'

test('renders dashboard hero', () => {
  const { getByText } = render(<MainDashboard />)
  expect(getByText('Welcome back, Valruna 👋')).toBeInTheDocument()
})
