import { render } from '@testing-library/react'
import Card from '../card'

test('renders card', () => {
  const { getByText } = render(<Card title='Title'>Body</Card>)
  expect(getByText('Title')).toBeInTheDocument()
})
