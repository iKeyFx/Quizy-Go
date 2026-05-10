import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { MOCK_NORMALIZED_USER } from '../../mocks/handlers'
import { createHookWrapper } from '../../utils/renderWithProviders'
import useLogin from '../../../features/authentication/useLogin'
import toast from 'react-hot-toast'

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('react-hot-toast', () => ({
  default: { error: vi.fn(), success: vi.fn() },
}))

// vi.mock is hoisted; use vi.hoisted() so the variable is defined before the factory runs
const mockLoginFn = vi.hoisted(() => vi.fn())
vi.mock('../../../services/apiAuth', () => ({
  login: mockLoginFn,
  signUp: vi.fn(),
}))

describe('useLogin', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    mockLoginFn.mockReset()
  })

  it('isPending is false initially', () => {
    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useLogin(), { wrapper })

    expect(result.current.isPending).toBe(false)
  })

  it('sets localStorage.user on successful login', async () => {
    mockLoginFn.mockResolvedValue({ data: { user: MOCK_NORMALIZED_USER } })

    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useLogin(), { wrapper })

    act(() => {
      result.current.loginAPi({ email: 'alice@test.com', password: 'ValidPass1' })
    })

    await waitFor(() => expect(mockNavigate).toHaveBeenCalled())

    const stored = JSON.parse(localStorage.getItem('user'))
    expect(stored._id).toBe(MOCK_NORMALIZED_USER._id)
    expect(stored.firstName).toBe(MOCK_NORMALIZED_USER.firstName)
  })

  it('sets React Query cache ["user"] on successful login', async () => {
    mockLoginFn.mockResolvedValue({ data: { user: MOCK_NORMALIZED_USER } })

    const { qc, wrapper } = createHookWrapper()
    const { result } = renderHook(() => useLogin(), { wrapper })

    act(() => {
      result.current.loginAPi({ email: 'alice@test.com', password: 'ValidPass1' })
    })

    await waitFor(() => {
      const cached = qc.getQueryData(['user'])
      expect(cached).toBeTruthy()
    })
    expect(qc.getQueryData(['user'])._id).toBe(MOCK_NORMALIZED_USER._id)
  })

  it('navigates to /dashboard on successful login', async () => {
    mockLoginFn.mockResolvedValue({ data: { user: MOCK_NORMALIZED_USER } })

    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useLogin(), { wrapper })

    act(() => {
      result.current.loginAPi({ email: 'alice@test.com', password: 'ValidPass1' })
    })

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true })
    )
  })

  it('does NOT set localStorage on failed login', async () => {
    mockLoginFn.mockRejectedValue(new Error('Invalid credentials'))

    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useLogin(), { wrapper })

    act(() => {
      result.current.loginAPi({ email: 'wrong@test.com', password: 'wrongpass1' })
    })

    await waitFor(() => expect(result.current.isPending).toBe(false))

    expect(localStorage.getItem('user')).toBeNull()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('calls toast.error on failed login', async () => {
    mockLoginFn.mockRejectedValue(new Error('Invalid credentials'))

    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useLogin(), { wrapper })

    act(() => {
      result.current.loginAPi({ email: 'wrong@test.com', password: 'wrongpass1' })
    })

    await waitFor(() => expect(toast.error).toHaveBeenCalled())
  })
})
