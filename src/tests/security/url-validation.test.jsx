import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router'
import AppLayoutUser from '../../pages/AppLayoutUser'
import PageNotFound from '../../pages/PageNotFound'
import { createTestQueryClient } from '../utils/renderWithProviders'
import { VALID_CATEGORIES, VALID_DIFFICULTIES } from '../../data/constants'

function renderAt(component, path, activeQuizUrl = null) {
  if (activeQuizUrl) localStorage.setItem('activeQuizUrl', activeQuizUrl)
  const qc = createTestQueryClient()
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/quiz/:category/:difficulty" element={<div>Quiz</div>} />
          <Route element={component}>
            <Route path="*" element={<div>Outlet</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('AppLayoutUser — activeQuizUrl validation', () => {
  it('redirects to valid activeQuizUrl when on a different route', () => {
    localStorage.setItem('activeQuizUrl', '/quiz/Arts/Easy')
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/quiz/Arts/Easy" element={<div>Active Quiz</div>} />
            <Route path="/quiz/:category/:difficulty" element={<div>Quiz</div>} />
            <Route path="/dashboard" element={<AppLayoutUser />}>
              <Route index element={<div>Dash Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText('Active Quiz')).toBeInTheDocument()
  })

  it('does NOT redirect with invalid category — clears key', () => {
    localStorage.setItem('activeQuizUrl', '/quiz/Hacking/Easy')
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/dashboard" element={<AppLayoutUser />}>
              <Route index element={<div>Dash Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText('Dash Content')).toBeInTheDocument()
    expect(localStorage.getItem('activeQuizUrl')).toBeNull()
  })

  it('does NOT redirect with invalid difficulty — clears key', () => {
    localStorage.setItem('activeQuizUrl', '/quiz/Arts/GodMode')
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/dashboard" element={<AppLayoutUser />}>
              <Route index element={<div>Dash Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText('Dash Content')).toBeInTheDocument()
    expect(localStorage.getItem('activeQuizUrl')).toBeNull()
  })

  it('does NOT redirect with path traversal attempt', () => {
    localStorage.setItem('activeQuizUrl', '/quiz/../../etc/passwd/Easy')
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/dashboard" element={<AppLayoutUser />}>
              <Route index element={<div>Dash Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText('Dash Content')).toBeInTheDocument()
    expect(localStorage.getItem('activeQuizUrl')).toBeNull()
  })

  it('does NOT redirect with URL-encoded path injection', () => {
    // decodeURIComponent('%2Fetc%2Fpasswd') = '/etc/passwd' — not in VALID_CATEGORIES
    localStorage.setItem('activeQuizUrl', '/quiz/%2Fetc%2Fpasswd/Easy')
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/dashboard" element={<AppLayoutUser />}>
              <Route index element={<div>Dash Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText('Dash Content')).toBeInTheDocument()
    expect(localStorage.getItem('activeQuizUrl')).toBeNull()
  })

  it('does NOT redirect with XSS payload in URL', () => {
    localStorage.setItem('activeQuizUrl', '/quiz/<script>alert(1)<\/script>/Easy')
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/dashboard" element={<AppLayoutUser />}>
              <Route index element={<div>Dash Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText('Dash Content')).toBeInTheDocument()
    expect(localStorage.getItem('activeQuizUrl')).toBeNull()
  })
})

describe('PageNotFound — activeQuizUrl validation', () => {
  it('redirects to valid activeQuizUrl', () => {
    localStorage.setItem('activeQuizUrl', '/quiz/Science/Medium')
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <Routes>
            <Route path="/quiz/Science/Medium" element={<div>Science Quiz</div>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText('Science Quiz')).toBeInTheDocument()
  })

  it('shows 404 page content when activeQuizUrl is absent', () => {
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/totally-unknown']}>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText(/can't be found/i)).toBeInTheDocument()
  })

  it('clears invalid activeQuizUrl and shows 404', () => {
    localStorage.setItem('activeQuizUrl', '/quiz/FakeCategory/FakeDifficulty')
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/totally-unknown']}>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText(/can't be found/i)).toBeInTheDocument()
    expect(localStorage.getItem('activeQuizUrl')).toBeNull()
  })
})

describe('Route param validation — all valid combinations', () => {
  it('VALID_CATEGORIES × VALID_DIFFICULTIES are all distinct valid combos', () => {
    const combos = VALID_CATEGORIES.flatMap((c) =>
      VALID_DIFFICULTIES.map((d) => `${c}|${d}`)
    )
    expect(combos).toHaveLength(12)
    expect(new Set(combos).size).toBe(12)
  })
})
