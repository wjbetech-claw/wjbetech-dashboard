import { render } from '@testing-library/react'
import { Select } from '../select'

test('renders select', () => {
  const { getByRole } = render(<Select><option>One</option></Select>)
  expect(getByRole('combobox')).toBeInTheDocument()
})
