import { render } from '@testing-library/react'
import JobsPage from '../JobsPage'

test('renders jobs page', () => {
  const { getByText } = render(<JobsPage />)
  expect(getByText('Jobs pipeline')).toBeInTheDocument()
})
