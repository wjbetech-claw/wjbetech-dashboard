import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from '../badge'

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>New</Badge>)
    const el = screen.getByText('New')
    expect(el).toBeInTheDocument()
  })
})
