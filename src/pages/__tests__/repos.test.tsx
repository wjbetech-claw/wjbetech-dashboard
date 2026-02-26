import { render } from '@testing-library/react'
import ReposPage from '../ReposPage'

test('renders repos page', () => {
  const { getByText } = render(<ReposPage />)
  expect(getByText('Repositories')).toBeInTheDocument()
})
