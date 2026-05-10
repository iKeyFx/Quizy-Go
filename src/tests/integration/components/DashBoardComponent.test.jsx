import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DashBoardComponent from '../../../components/DashBoardComponent'

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

function renderDashboard(props = {}) {
  const defaults = {
    category: 'Arts',
    text: 'Explore quizzes on art history',
    image: null,
    borderColor: 'blue',
    ...props,
  }
  const qc = new QueryClient()
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter>
        <DashBoardComponent {...defaults} />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('DashBoardComponent', () => {
  it('renders the category name', () => {
    renderDashboard({ category: 'Science' })
    expect(screen.getByText('Science')).toBeInTheDocument()
  })

  it('renders the descriptive text', () => {
    renderDashboard({ text: 'Test your biology knowledge' })
    expect(screen.getByText('Test your biology knowledge')).toBeInTheDocument()
  })

  it('renders the Take Quiz button', () => {
    renderDashboard()
    expect(screen.getByRole('button', { name: /take quiz/i })).toBeInTheDocument()
  })

  it('navigates to /dashboard/{category} when Take Quiz button is clicked', async () => {
    const user = userEvent.setup()
    renderDashboard({ category: 'Arts' })

    await user.click(screen.getByRole('button', { name: /take quiz/i }))

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/Arts')
  })

  it('does not crash when image prop is null', () => {
    expect(() => renderDashboard({ image: null })).not.toThrow()
  })

  it('renders image when image prop is provided', () => {
    renderDashboard({ image: 'art.png' })
    expect(screen.getByAltText('image')).toBeInTheDocument()
  })

  it('shows button on mouse enter', async () => {
    const user = userEvent.setup()
    renderDashboard()

    const container = screen.getByText('Arts').closest('div')
    await user.hover(container)

    expect(screen.getByRole('button', { name: /take quiz/i })).toBeInTheDocument()
  })
})
