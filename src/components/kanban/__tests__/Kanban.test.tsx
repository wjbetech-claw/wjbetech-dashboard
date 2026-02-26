import { render } from '@testing-library/react'
import Kanban from '../Kanban'

test('renders kanban board', () => {
  const { getByText } = render(<Kanban />)
  expect(getByText('Kanban board')).toBeInTheDocument()
})
