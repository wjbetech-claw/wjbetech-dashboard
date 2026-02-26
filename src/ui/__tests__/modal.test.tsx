import { render } from '@testing-library/react'
import { Modal } from '../modal'

test('renders modal when open', () => {
  const { getByText } = render(<Modal open onClose={() => {}} title="Title">Content</Modal>)
  expect(getByText('Content')).toBeInTheDocument()
})
