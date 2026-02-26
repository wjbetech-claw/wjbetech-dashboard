import { render } from '@testing-library/react'
import PipelineOverview from '../PipelineOverview'

test('renders pipeline overview', () => {
  const { getByText } = render(<PipelineOverview />)
  expect(getByText('Pipeline overview')).toBeInTheDocument()
})
