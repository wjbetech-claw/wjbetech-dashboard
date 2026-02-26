import { render } from '@testing-library/react'
import EnvironmentsGrid from '../EnvironmentsGrid'

test('renders environments grid', () => {
  const { getByText } = render(<EnvironmentsGrid />)
  expect(getByText('Environments')).toBeInTheDocument()
})
