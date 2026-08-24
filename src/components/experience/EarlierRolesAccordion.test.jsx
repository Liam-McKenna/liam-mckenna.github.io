import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EarlierRolesAccordion from './EarlierRolesAccordion.jsx'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

const roles = [
  { id: 'a', title: 'Role A', company: 'Company A', start: '2020', end: '2021', description: 'Description A' },
  { id: 'b', title: 'Role B', company: 'Company B', start: '2021', end: '2022', description: 'Description B' },
]

describe('EarlierRolesAccordion', () => {
  it('keeps all entries collapsed by default', () => {
    render(<EarlierRolesAccordion roles={roles} />)
    expect(screen.queryByText('Description A')).not.toBeInTheDocument()
    expect(screen.queryByText('Description B')).not.toBeInTheDocument()
  })

  it('expands one entry on click without opening the others', async () => {
    const user = userEvent.setup()
    render(<EarlierRolesAccordion roles={roles} />)

    await user.click(screen.getByRole('button', { name: /Role A/i }))

    expect(screen.getByText('Description A')).toBeInTheDocument()
    expect(screen.queryByText('Description B')).not.toBeInTheDocument()
  })

  it('collapses an open entry when clicked again', async () => {
    const user = userEvent.setup()
    render(<EarlierRolesAccordion roles={roles} />)

    const trigger = screen.getByRole('button', { name: /Role A/i })
    await user.click(trigger)
    expect(screen.getByText('Description A')).toBeInTheDocument()

    await user.click(trigger)
    expect(screen.queryByText('Description A')).not.toBeInTheDocument()
  })

  it('switches open entry when a different trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<EarlierRolesAccordion roles={roles} />)

    await user.click(screen.getByRole('button', { name: /Role A/i }))
    await user.click(screen.getByRole('button', { name: /Role B/i }))

    expect(screen.queryByText('Description A')).not.toBeInTheDocument()
    expect(screen.getByText('Description B')).toBeInTheDocument()
  })
})
