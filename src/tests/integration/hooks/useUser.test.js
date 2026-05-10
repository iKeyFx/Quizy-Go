import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useUser } from '../../../features/authentication/useUser'
import { createHookWrapper, createTestQueryClient } from '../../utils/renderWithProviders'

describe('useUser', () => {
  it('returns null when localStorage is empty', () => {
    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useUser(), { wrapper })

    expect(result.current.user).toBeNull()
  })

  it('isPending is false immediately (initialData resolves synchronously)', () => {
    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useUser(), { wrapper })

    expect(result.current.isPending).toBe(false)
  })

  it('returns parsed user when localStorage has valid JSON', () => {
    const user = { _id: 'u1', email: 'test@test.com', firstName: 'Alice', lastName: 'Smith' }
    localStorage.setItem('user', JSON.stringify(user))

    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useUser(), { wrapper })

    expect(result.current.user).toEqual(user)
  })

  it('updates when queryClient.setQueryData is called', async () => {
    const { qc, wrapper } = createHookWrapper()
    const { result } = renderHook(() => useUser(), { wrapper })

    expect(result.current.user).toBeNull()

    const newUser = { _id: 'u2', email: 'new@test.com', firstName: 'Bob', lastName: 'Jones' }
    qc.setQueryData(['user'], newUser)

    await new Promise((r) => setTimeout(r, 10))
    expect(result.current.user).toEqual(newUser)
  })

  it('returns null for malformed localStorage JSON (Bug B fix)', () => {
    localStorage.setItem('user', 'not-valid-json{{{')

    const { wrapper } = createHookWrapper()
    expect(() => renderHook(() => useUser(), { wrapper })).not.toThrow()

    const { result } = renderHook(() => useUser(), { wrapper })
    expect(result.current.user).toBeNull()
    expect(localStorage.getItem('user')).toBeNull()
  })
})
