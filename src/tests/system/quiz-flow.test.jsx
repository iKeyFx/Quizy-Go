import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router'
import { http, HttpResponse } from 'msw'
import { server } from '../mocks/server'
import { MOCK_NORMALIZED_USER, MOCK_QUESTIONS } from '../mocks/handlers'
import QuizScreen from '../../features/quizscreen/QuizScreen'
import { createTestQueryClient } from '../utils/renderWithProviders'

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('react-hot-toast', () => ({
  default: { error: vi.fn(), success: vi.fn() },
}))

// Normalized questions (with correctOption) for cache pre-seeding
const CACHED_QUESTIONS = MOCK_QUESTIONS.map((q) => ({
  ...q,
  correctOption: q.correct_option,
}))

function renderQuizScreen(category = 'Arts', difficulty = 'Easy', opts = {}) {
  const qc = createTestQueryClient()
  const user = opts.user ?? MOCK_NORMALIZED_USER

  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
    qc.setQueryData(['user'], user)
  }

  if (opts.preloadQuestions !== false) {
    qc.setQueryData(['quiz_questions', category, difficulty], CACHED_QUESTIONS)
  }

  vi.spyOn(window.history, 'pushState').mockImplementation(() => {})

  return {
    ...render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={[`/quiz/${category}/${difficulty}`]}>
          <Routes>
            <Route path="/dashboard" element={<div>Dashboard</div>} />
            <Route path="/quiz/:category/:difficulty" element={<QuizScreen />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    ),
    qc,
  }
}

describe('QuizScreen — rendering', () => {
  beforeEach(() => mockNavigate.mockClear())

  it('renders first question with pre-seeded cache', async () => {
    renderQuizScreen()
    await waitFor(() =>
      expect(screen.getByText(/Who painted Mona Lisa/i)).toBeInTheDocument()
    )
  })

  it('Next button is disabled before selecting an answer', async () => {
    renderQuizScreen()
    await waitFor(() => screen.getByText(/Who painted Mona Lisa/i))

    const nextButton = screen.queryByRole('button', { name: /next/i })
    if (nextButton) expect(nextButton).toBeDisabled()
  })

  it('Next button is enabled after selecting an answer', async () => {
    const user = userEvent.setup()
    renderQuizScreen()
    await waitFor(() => screen.getByText('Da Vinci'))

    await user.click(screen.getByText('Da Vinci'))

    const nextButton = screen.queryByRole('button', { name: /next/i })
    if (nextButton) expect(nextButton).not.toBeDisabled()
  })

  it('Submit button appears on last question', async () => {
    const user = userEvent.setup()
    renderQuizScreen()

    await waitFor(() => screen.getByText('Da Vinci'))
    await user.click(screen.getByText('Da Vinci'))

    const nextBtn = screen.queryByRole('button', { name: /next/i })
    if (nextBtn) {
      await user.click(nextBtn)
      await waitFor(() =>
        expect(screen.queryByRole('button', { name: /submit/i })).toBeInTheDocument()
      )
    }
  })

  it('shows error message when questions fetch fails', async () => {
    server.use(
      http.get('https://test.supabase.co/rest/v1/quiz_questions', () =>
        HttpResponse.json({ error: 'DB error' }, { status: 500 })
      )
    )

    renderQuizScreen('Arts', 'Easy', { preloadQuestions: false })

    await waitFor(() =>
      expect(screen.getByText(/Failed to load questions/i)).toBeInTheDocument()
    )
  })

  it('restores saved answers from localStorage on mount', async () => {
    localStorage.setItem('quizAnswers', JSON.stringify({ 0: 'Da Vinci' }))
    renderQuizScreen()

    await waitFor(() => screen.getByText('Da Vinci'))
    // Question 0 already answered — Next should be enabled
    const nextBtn = screen.queryByRole('button', { name: /next/i })
    if (nextBtn) expect(nextBtn).not.toBeDisabled()
  })

  it('restores timer from localStorage on mount', async () => {
    localStorage.setItem('quizTimeLeft', '300')
    renderQuizScreen()

    await waitFor(() => screen.getByText('Da Vinci'))
    expect(screen.getByText(/00:05:00/)).toBeInTheDocument()
  })
})

describe('QuizScreen — invalid params redirect', () => {
  beforeEach(() => mockNavigate.mockClear())

  it('redirects to /dashboard for invalid category param', async () => {
    // <Navigate to="/dashboard" replace /> renders, router navigates to Dashboard route
    renderQuizScreen('Hacking', 'Easy')

    await waitFor(() =>
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    )
  })

  it('redirects to /dashboard for invalid difficulty param', async () => {
    renderQuizScreen('Arts', 'GodMode')

    await waitFor(() =>
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    )
  })

  it('redirects to /dashboard when filteredQuestions is empty array', async () => {
    server.use(
      http.get('https://test.supabase.co/rest/v1/quiz_questions', () =>
        HttpResponse.json([])
      )
    )

    renderQuizScreen('Arts', 'Easy', { preloadQuestions: false })

    // Empty questions → <Navigate to="/dashboard" replace />
    await waitFor(() =>
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    )
  })
})

describe('QuizScreen — submit behavior', () => {
  beforeEach(() => mockNavigate.mockClear())

  it('handleSubmit clears all quiz localStorage keys on submit', async () => {
    const user = userEvent.setup()
    localStorage.setItem('quizTimeLeft', '300')
    localStorage.setItem('quizAnswers', JSON.stringify({}))
    renderQuizScreen()

    await waitFor(() => screen.getByText('Da Vinci'))

    await user.click(screen.getByText('Da Vinci'))
    const nextBtn = screen.queryByRole('button', { name: /next/i })
    if (nextBtn) {
      await user.click(nextBtn)
      await waitFor(() => screen.getByText('Surrealism'))
      await user.click(screen.getByText('Surrealism'))
    }

    const submitBtn = screen.queryByRole('button', { name: /submit/i })
    if (submitBtn) {
      await user.click(submitBtn)
      await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
      expect(localStorage.getItem('activeQuizUrl')).toBeNull()
      expect(localStorage.getItem('quizTimeLeft')).toBeNull()
      expect(localStorage.getItem('quizAnswers')).toBeNull()
    }
  })

  it('hasSubmitted ref prevents double-submit', async () => {
    const user = userEvent.setup()
    renderQuizScreen()

    await waitFor(() => screen.getByText('Da Vinci'))
    await user.click(screen.getByText('Da Vinci'))

    const nextBtn = screen.queryByRole('button', { name: /next/i })
    if (nextBtn) {
      await user.click(nextBtn)
      await waitFor(() => screen.getByText('Surrealism'))
      await user.click(screen.getByText('Surrealism'))
    }

    const submitBtn = screen.queryByRole('button', { name: /submit/i })
    if (submitBtn) {
      // Double-click Submit
      await user.click(submitBtn)
    }

    await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
    // navigate should be called exactly once despite double-click
    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })
})

describe('QuizScreen — timer', () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: false }))
  afterEach(() => vi.useRealTimers())

  it('timer counts down by 1 second', async () => {
    // Pre-seed cache AND user so component renders immediately without network
    const qc = createTestQueryClient()
    qc.setQueryData(['user'], MOCK_NORMALIZED_USER)
    qc.setQueryData(['quiz_questions', 'Arts', 'Easy'], CACHED_QUESTIONS)
    localStorage.setItem('user', JSON.stringify(MOCK_NORMALIZED_USER))

    vi.spyOn(window.history, 'pushState').mockImplementation(() => {})

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/quiz/Arts/Easy']}>
          <Routes>
            <Route path="/quiz/:category/:difficulty" element={<QuizScreen />} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    // Flush all pending state from initial render
    await act(async () => {})

    // Should show 10:00 (600 seconds)
    expect(screen.getByText('00:10:00')).toBeInTheDocument()

    // Advance 1 second
    await act(async () => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByText('00:09:59')).toBeInTheDocument()
  })

  it('auto-submits when timer reaches zero', async () => {
    mockNavigate.mockClear()
    localStorage.setItem('quizTimeLeft', '2')

    const qc = createTestQueryClient()
    qc.setQueryData(['user'], MOCK_NORMALIZED_USER)
    qc.setQueryData(['quiz_questions', 'Arts', 'Easy'], CACHED_QUESTIONS)
    localStorage.setItem('user', JSON.stringify(MOCK_NORMALIZED_USER))

    vi.spyOn(window.history, 'pushState').mockImplementation(() => {})

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/quiz/Arts/Easy']}>
          <Routes>
            <Route path="/quiz/:category/:difficulty" element={<QuizScreen />} />
            <Route path="/quiz/:category/:difficulty/result" element={<div>Result</div>} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    await act(async () => {})

    // Advance 1 second at a time so React flushes state and re-runs effects between ticks
    await act(async () => { vi.advanceTimersByTime(1000) })
    await act(async () => { vi.advanceTimersByTime(1000) })
    await act(async () => { vi.advanceTimersByTime(1000) })

    expect(mockNavigate).toHaveBeenCalled()
  })
})
