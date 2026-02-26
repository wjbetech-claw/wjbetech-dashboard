import { render } from '@testing-library/react'
import AlertsPanel from '../AlertsPanel'

test('renders alerts panel', () => {
  const { getByText } = render(<AlertsPanel />)
  expect(getByText('Alerts')).toBeInTheDocument()
})
