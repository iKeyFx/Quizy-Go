import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { createHookWrapper } from '../../utils/renderWithProviders'
import { MOCK_LEADERBOARD } from '../../mocks/handlers'
import usePersonalBest from '../../../features/leaderboard/usePersonalBest'

describe('usePersonalBest', () => {
  it('is disabled when userId is null', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const { wrapper } = createHookWrapper()

    renderHook(() => usePersonalBest(null), { wrapper })

    await new Promise((r) => setTimeout(r, 50))
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('is disabled when userId is empty string', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const { wrapper } = createHookWrapper()

    renderHook(() => usePersonalBest(''), { wrapper })

    await new Promise((r) => setTimeout(r, 50))
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('fetches when userId is a truthy string', async () => {
    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => usePersonalBest('user-123'), { wrapper })

    await waitFor(() => expect(result.current.isPending).toBe(false))

    expect(result.current.data).toBeDefined()
  })

  it('uses queryKey ["leaderboard","personal",userId]', () => {
    const userId = 'user-abc'
    const { qc, wrapper } = createHookWrapper()
    qc.setQueryData(['leaderboard', 'personal', userId], [])

    const { result } = renderHook(() => usePersonalBest(userId), { wrapper })

    expect(result.current.data).toEqual([])
  })

  it('normalizes returned rows to camelCase', async () => {
    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => usePersonalBest('user-123'), { wrapper })

    await waitFor(() => expect(result.current.isPending).toBe(false))

    if (result.current.data?.length > 0) {
      expect(result.current.data[0].userId).toBeDefined()
      expect(result.current.data[0].timeTaken).toBeDefined()
    }
  })
})
