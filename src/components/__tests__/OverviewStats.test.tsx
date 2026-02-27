import { render } from '@testing-library/react'
import OverviewStats from '../OverviewStats'

test('renders overview stats', () => {
  const { getByText } = render(<OverviewStats />)
  expect(getByText('Active pipelines')).toBeInTheDocument()
})
