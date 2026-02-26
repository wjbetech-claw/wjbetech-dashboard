import { render } from '@testing-library/react'
import { Badge } from '../badge'

test('renders badge', () => {
  const { getByText } = render(<Badge>Active</Badge>)
  expect(getByText('Active')).toBeInTheDocument()
})
