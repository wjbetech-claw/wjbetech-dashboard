import { render } from '@testing-library/react'
import { ErrorBanner } from '../error-banner'

test('renders error banner', () => {
  const { getByText } = render(<ErrorBanner message='Boom' />)
  expect(getByText('Boom')).toBeInTheDocument()
})
