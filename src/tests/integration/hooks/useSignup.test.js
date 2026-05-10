import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { createHookWrapper } from '../../utils/renderWithProviders'
import useSignup from '../../../features/authentication/useSignup'
import toast from 'react-hot-toast'

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() },
}))

// Mock apiAuth directly — more reliable than MSW for Supabase SDK auth responses
const mockSignUpFn = vi.hoisted(() => vi.fn())
vi.mock('../../../services/apiAuth', () => ({
  signUp: mockSignUpFn,
}))

const VALID_DATA = {
  email: 'new@test.com',
  password: 'ValidP@ss1',
  fname: 'Alice',
  lname: 'Smith',
  confirmPassword: 'ValidP@ss1',
}

describe('useSignup', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    mockSignUpFn.mockReset()
  })

  it('isPending is false initially', () => {
    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useSignup(), { wrapper })

    expect(result.current.isPending).toBe(false)
  })

  it('navigates to /login on successful signup', async () => {
    mockSignUpFn.mockResolvedValue({ user: { id: 'new-456' } })

    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useSignup(), { wrapper })

    act(() => { result.current.userSignUp(VALID_DATA) })

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true })
    )
  })

  it('calls toast.success on successful signup', async () => {
    mockSignUpFn.mockResolvedValue({ user: { id: 'new-456' } })

    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useSignup(), { wrapper })

    act(() => { result.current.userSignUp(VALID_DATA) })

    await waitFor(() => expect(toast.success).toHaveBeenCalled())
  })

  it('calls toast.error on generic signup failure', async () => {
    mockSignUpFn.mockRejectedValue(new Error('Service unavailable'))

    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useSignup(), { wrapper })

    act(() => { result.current.userSignUp(VALID_DATA) })

    await waitFor(() => expect(toast.error).toHaveBeenCalled())
  })

  it('does not call toast.error for duplicate email error', async () => {
    mockSignUpFn.mockRejectedValue(new Error('User already registered'))

    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useSignup(), { wrapper })

    act(() => { result.current.userSignUp({ ...VALID_DATA, email: 'existing@test.com' }) })

    await waitFor(() => expect(result.current.isPending).toBe(false))
    expect(toast.error).not.toHaveBeenCalled()
  })
})
