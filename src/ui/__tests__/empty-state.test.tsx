import { render } from '@testing-library/react'
import { EmptyState } from '../empty-state'

test('renders empty state', () => {
  const { getByText } = render(<EmptyState title='No data' message='Nothing here' />)
  expect(getByText('No data')).toBeInTheDocument()
})
