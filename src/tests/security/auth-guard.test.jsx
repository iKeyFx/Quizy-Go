import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router'
import ProtectedRoute from '../../ui/ProtectedRoutes'
import { createTestQueryClient } from '../utils/renderWithProviders'

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

function renderProtectedRoute({ user = null, isPending = false } = {}) {
  const qc = createTestQueryClient()

  // Seed the query cache with user state
  if (user) {
    qc.setQueryData(['user'], user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('ProtectedRoute', () => {
  it('renders children when user is authenticated', async () => {
    const user = { _id: 'u1', email: 'test@test.com', firstName: 'Alice', lastName: 'Smith' }
    renderProtectedRoute({ user })

    await waitFor(() => expect(screen.getByText('Protected Content')).toBeInTheDocument())
  })

  it('navigates to /login when user is null and not pending', async () => {
    renderProtectedRoute({ user: null, isPending: false })

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true }))
  })

  it('removes all quiz-related localStorage keys on logout redirect', async () => {
    localStorage.setItem('user', 'null')
    localStorage.setItem('quizTimeLeft', '300')
    localStorage.setItem('quizAnswers', '{}')
    localStorage.setItem('activeQuizUrl', '/quiz/Arts/Easy')

    renderProtectedRoute({ user: null })

    await waitFor(() => expect(mockNavigate).toHaveBeenCalled())

    expect(localStorage.getItem('user')).toBeNull()
    expect(localStorage.getItem('quizTimeLeft')).toBeNull()
    expect(localStorage.getItem('quizAnswers')).toBeNull()
    expect(localStorage.getItem('activeQuizUrl')).toBeNull()
  })

  it('calls queryClient.clear() on logout redirect', async () => {
    const qc = createTestQueryClient()
    const clearSpy = vi.spyOn(qc, 'clear')

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div>Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )

    await waitFor(() => expect(clearSpy).toHaveBeenCalled())
  })

  it('logs out when storage event fires with key="user" and newValue=null', async () => {
    const user = { _id: 'u1', email: 'test@test.com', firstName: 'Alice', lastName: 'Smith' }
    renderProtectedRoute({ user })

    await waitFor(() => expect(screen.getByText('Protected Content')).toBeInTheDocument())

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'user', newValue: null })
      )
    })

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true }))
  })

  it('does NOT log out when storage event is for a different key', async () => {
    mockNavigate.mockClear()
    const user = { _id: 'u1', email: 'test@test.com', firstName: 'Alice', lastName: 'Smith' }
    renderProtectedRoute({ user })

    await waitFor(() => expect(screen.getByText('Protected Content')).toBeInTheDocument())

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'someOtherKey', newValue: null })
      )
    })

    // Small delay to ensure no navigation occurred
    await new Promise((r) => setTimeout(r, 50))
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
