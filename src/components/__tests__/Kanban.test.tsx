import React from 'react'
import { render, screen } from '@testing-library/react'
import Kanban from '../kanban/Kanban'

describe('Kanban', ()=>{
  beforeEach(()=>{ localStorage.clear() })
  test('renders board and sample task', ()=>{
    render(<Kanban />)
    const root = screen.getByTestId('kanban-root')
    expect(root).toBeInTheDocument()
    const backlog = screen.getByText(/Backlog/)
    expect(backlog).toBeInTheDocument()
    // sample task from DEFAULT_COLS
    expect(screen.getByText('Design dashboard polish')).toBeInTheDocument()
  })
})
