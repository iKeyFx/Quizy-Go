import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { createHookWrapper } from '../../utils/renderWithProviders'
import useLogout from '../../../features/authentication/useLogout'

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

// vi.mock is hoisted; use vi.hoisted() so the variable is defined before the factory runs
const mockSignOut = vi.hoisted(() => vi.fn())
vi.mock('../../../services/supabase', () => ({
  supabase: {
    auth: {
      signOut: mockSignOut,
    },
  },
}))

describe('useLogout', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    mockSignOut.mockReset()
    localStorage.setItem('user', JSON.stringify({ _id: 'u1', email: 'a@b.com' }))
  })

  it('removes localStorage.user on successful logout', async () => {
    mockSignOut.mockResolvedValue({ error: null })

    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useLogout(), { wrapper })

    await act(async () => { await result.current() })

    expect(localStorage.getItem('user')).toBeNull()
  })

  it('calls queryClient.removeQueries with options object — Bug A regression', async () => {
    mockSignOut.mockResolvedValue({ error: null })

    const { qc, wrapper } = createHookWrapper()
    qc.setQueryData(['user'], { _id: 'u1' })

    const removeQueriesSpy = vi.spyOn(qc, 'removeQueries')
    const { result } = renderHook(() => useLogout(), { wrapper })

    await act(async () => { await result.current() })

    expect(removeQueriesSpy).toHaveBeenCalledWith({ queryKey: ['user'] })
  })

  it('navigates to /login on successful logout', async () => {
    mockSignOut.mockResolvedValue({ error: null })

    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useLogout(), { wrapper })

    await act(async () => { await result.current() })

    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true })
  })

  it('does NOT clear localStorage when signOut returns an error', async () => {
    mockSignOut.mockResolvedValue({ error: { message: 'sign out failed' } })

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useLogout(), { wrapper })

    await act(async () => { await result.current() })

    expect(localStorage.getItem('user')).not.toBeNull()
    expect(mockNavigate).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('logs console.error when signOut fails', async () => {
    mockSignOut.mockResolvedValue({ error: { message: 'network error' } })

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useLogout(), { wrapper })

    await act(async () => { await result.current() })

    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
