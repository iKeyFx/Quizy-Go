import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useUser } from '../../features/authentication/useUser'
import { createHookWrapper } from '../utils/renderWithProviders'

describe('useUser — localStorage security', () => {
  it('returns null when localStorage is empty', () => {
    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useUser(), { wrapper })

    expect(result.current.user).toBeNull()
    expect(result.current.isPending).toBe(false)
  })

  it('returns parsed user when localStorage contains valid JSON', () => {
    const fakeUser = { _id: 'u1', email: 'test@test.com', firstName: 'Alice', lastName: 'Smith' }
    localStorage.setItem('user', JSON.stringify(fakeUser))

    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useUser(), { wrapper })

    expect(result.current.user).toEqual(fakeUser)
  })

  it('documents that arbitrary localStorage data is trusted without server verification', () => {
    // Security note: useUser reads localStorage without verifying with Supabase.
    // Client-side auth guard can be bypassed by setting localStorage.user to any JSON.
    // Actual API security is enforced by Supabase RLS on the server.
    const injectedUser = {
      _id: 'fake-id',
      email: 'hacker@evil.com',
      firstName: 'Fake',
      lastName: 'User',
    }
    localStorage.setItem('user', JSON.stringify(injectedUser))

    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useUser(), { wrapper })

    // This passes — documents the known behavior
    expect(result.current.user._id).toBe('fake-id')
  })

  it('returns null and clears key when localStorage contains malformed JSON (Bug B fix)', () => {
    localStorage.setItem('user', 'not-valid-json{{{')

    const { wrapper } = createHookWrapper()
    // Should NOT throw — Bug B fix wraps JSON.parse in try/catch
    expect(() => renderHook(() => useUser(), { wrapper })).not.toThrow()

    const { result } = renderHook(() => useUser(), { wrapper })
    expect(result.current.user).toBeNull()
    expect(localStorage.getItem('user')).toBeNull()
  })

  it('does not make any network calls on mount (no queryFn)', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    const { wrapper } = createHookWrapper()
    renderHook(() => useUser(), { wrapper })

    // Give any potential async effects time to fire
    await new Promise((r) => setTimeout(r, 50))

    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })
})
