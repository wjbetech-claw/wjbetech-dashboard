import { render } from '@testing-library/react'
import { Button } from '../button'

test('renders button', () => {
  const { getByText } = render(<Button>Click</Button>)
  expect(getByText('Click')).toBeInTheDocument()
})
