import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Kanban from '../Kanban'

// Basic smoke tests for Kanban: renders, persists to localStorage, keyboard sensor present
describe('Kanban board', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders columns and cards', () => {
    render(<Kanban />)
    expect(screen.getByText(/Backlog/i)).toBeInTheDocument()
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument()
    expect(screen.getByText(/Done/i)).toBeInTheDocument()
  })

  it('persists state to localStorage (wjb_kanban_v4)', () => {
    const { unmount } = render(<Kanban />)
    // Expect initial items to be present and saved under key
    const raw = localStorage.getItem('wjb_kanban_v4')
    expect(raw).not.toBeNull()
    unmount()
  })

  it('supports keyboard sensor configuration', () => {
    render(<Kanban />)
    // Check that the keyboard sensor hook is used indirectly by presence of draggable items
    const card = screen.getByText(/Design dashboard polish/i)
    expect(card).toBeInTheDocument()
    // try focusing and simulating key events (arrow keys) to trigger keyboard interactions
    act(() => { card.focus() })
    fireEvent.keyDown(card, { key: ' ', code: 'Space' }) // start drag with keyboard
    // no assertions about DOM mutation here — just ensure no errors
  })
})
