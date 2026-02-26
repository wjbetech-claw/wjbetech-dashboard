import { render } from '@testing-library/react'
import RecentActivity from '../RecentActivity'

test('renders recent activity', () => {
  const { getByText } = render(<RecentActivity />)
  expect(getByText('Recent activity')).toBeInTheDocument()
})
