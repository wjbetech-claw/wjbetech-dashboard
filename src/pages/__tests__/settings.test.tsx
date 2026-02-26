import { render } from '@testing-library/react'
import SettingsPage from '../SettingsPage'

test('renders settings page', () => {
  const { getByText } = render(<SettingsPage />)
  expect(getByText('Settings')).toBeInTheDocument()
})
