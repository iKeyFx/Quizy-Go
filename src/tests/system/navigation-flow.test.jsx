import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router'
import ProtectedRoute from '../../ui/ProtectedRoutes'
import AppLayoutUser from '../../pages/AppLayoutUser'
import PageNotFound from '../../pages/PageNotFound'
import { createTestQueryClient } from '../utils/renderWithProviders'
import { MOCK_NORMALIZED_USER } from '../mocks/handlers'

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

describe('ProtectedRoute navigation guard', () => {
  it('redirects unauthenticated user to /login', async () => {
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/login" element={<div>Login</div>} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div>Dashboard Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true })
    )
  })

  it('renders children for authenticated user', async () => {
    const qc = createTestQueryClient()
    qc.setQueryData(['user'], MOCK_NORMALIZED_USER)
    localStorage.setItem('user', JSON.stringify(MOCK_NORMALIZED_USER))

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div>Protected Dashboard</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    await waitFor(() =>
      expect(screen.getByText('Protected Dashboard')).toBeInTheDocument()
    )
  })
})

describe('AppLayoutUser — activeQuizUrl redirect', () => {
  it('redirects to valid activeQuizUrl when on different route', () => {
    localStorage.setItem('activeQuizUrl', '/quiz/Arts/Easy')
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/quiz/Arts/Easy" element={<div>Active Quiz</div>} />
            <Route path="/dashboard" element={<AppLayoutUser />}>
              <Route index element={<div>Dash</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText('Active Quiz')).toBeInTheDocument()
  })

  it('renders outlet normally when activeQuizUrl is absent', () => {
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/dashboard" element={<AppLayoutUser />}>
              <Route index element={<div>Dashboard Outlet</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText('Dashboard Outlet')).toBeInTheDocument()
  })

  it('clears invalid activeQuizUrl and renders outlet normally', () => {
    localStorage.setItem('activeQuizUrl', '/quiz/FakeCategory/FakeDifficulty')
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/dashboard" element={<AppLayoutUser />}>
              <Route index element={<div>Normal Dashboard</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText('Normal Dashboard')).toBeInTheDocument()
    expect(localStorage.getItem('activeQuizUrl')).toBeNull()
  })
})

describe('PageNotFound', () => {
  it('shows 404 message for truly unknown route with no activeQuizUrl', () => {
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/totally-unknown-page']}>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText(/can't be found/i)).toBeInTheDocument()
  })

  it('redirects to valid activeQuizUrl when present', () => {
    localStorage.setItem('activeQuizUrl', '/quiz/Commercial/Medium')
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/unknown']}>
          <Routes>
            <Route path="/quiz/Commercial/Medium" element={<div>Commercial Quiz</div>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText('Commercial Quiz')).toBeInTheDocument()
  })
})
