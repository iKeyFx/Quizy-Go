import { describe, it, expect, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { server } from '../../mocks/server'
import { createHookWrapper } from '../../utils/renderWithProviders'
import useSubmitScore from '../../../features/quizscreen/useSubmitScore'
import toast from 'react-hot-toast'

vi.mock('react-hot-toast', () => ({
  default: { error: vi.fn(), success: vi.fn() },
}))

describe('useSubmitScore', () => {
  it('isSubmitting is false initially', () => {
    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useSubmitScore(), { wrapper })

    expect(result.current.isSubmitting).toBe(false)
  })

  it('invalidates ["leaderboard"] queries on successful submit', async () => {
    const { qc, wrapper } = createHookWrapper()
    qc.setQueryData(['leaderboard', 'all', 'all'], [])

    const invalidateSpy = vi.spyOn(qc, 'invalidateQueries')
    const { result } = renderHook(() => useSubmitScore(), { wrapper })

    act(() => {
      result.current.submitScore({
        userId: 'u1',
        firstName: 'Alice',
        lastName: 'Smith',
        category: 'Arts',
        difficulty: 'Easy',
        score: 8,
        timeTaken: 200,
      })
    })

    await waitFor(() =>
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['leaderboard'] })
    )
  })

  it('calls toast.error on failed submit', async () => {
    server.use(
      http.post('https://test.supabase.co/rest/v1/leaderboard', () =>
        HttpResponse.json({ error: 'RLS violation' }, { status: 403 })
      )
    )

    const { wrapper } = createHookWrapper()
    const { result } = renderHook(() => useSubmitScore(), { wrapper })

    act(() => {
      result.current.submitScore({
        userId: 'u1',
        firstName: 'Alice',
        lastName: 'Smith',
        category: 'Arts',
        difficulty: 'Easy',
        score: 8,
        timeTaken: 200,
      })
    })

    await waitFor(() => expect(toast.error).toHaveBeenCalled())
  })
})
