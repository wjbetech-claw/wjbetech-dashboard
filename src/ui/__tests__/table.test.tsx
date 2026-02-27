import { render } from '@testing-library/react'
import { Table, THead, TBody, TR, TH, TD } from '../table'

test('renders table', () => {
  const { getByText } = render(
    <Table>
      <THead><TR><TH>Col</TH></TR></THead>
      <TBody><TR><TD>Row</TD></TR></TBody>
    </Table>
  )
  expect(getByText('Row')).toBeInTheDocument()
})
