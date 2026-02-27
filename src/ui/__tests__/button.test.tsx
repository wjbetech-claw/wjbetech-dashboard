import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect } from 'vitest'
import { Button } from '../button'

describe('Button', () => {
  it('renders and responds to clicks', async () => {
    const handle = vi.fn()
    render(<Button onClick={handle}>Click me</Button>)
    const btn = screen.getByRole('button', { name: /click me/i })
    expect(btn).toBeInTheDocument()
    await userEvent.click(btn)
    expect(handle).toHaveBeenCalled()
  })
})
