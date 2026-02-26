import { render } from '@testing-library/react'
import { Input } from '../input'

test('renders input', () => {
  const { getByPlaceholderText } = render(<Input placeholder="Email" />)
  expect(getByPlaceholderText('Email')).toBeInTheDocument()
})
