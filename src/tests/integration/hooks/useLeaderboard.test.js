import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { createHookWrapper } from '../../utils/renderWithProviders'
import { MOCK_LEADERBOARD } from '../../mocks/handlers'
import useLeaderboard from '../../../features/leaderboard/useLeaderboard'

describe('useLeaderboard', () => {
  it('uses queryKey ["leaderboard","all","all"] when no filters provided', () => {
    const { qc, wrapper } = createHookWrapper()
    qc.setQueryData(['leaderboard', 'all', 'all'], [])

    const { result } = renderHook(
      () => useLeaderboard({ category: null, difficulty: null }),
      { wrapper }
    )

    expect(result.current.data).toEqual([])
  })

  it('uses queryKey ["leaderboard","Arts","all"] when only category provided', () => {
    const { qc, wrapper } = createHookWrapper()
    qc.setQueryData(['leaderboard', 'Arts', 'all'], [])

    const { result } = renderHook(
      () => useLeaderboard({ category: 'Arts', difficulty: null }),
      { wrapper }
    )

    expect(result.current.data).toEqual([])
  })

  it('uses queryKey ["leaderboard","all","Easy"] when only difficulty provided', () => {
    const { qc, wrapper } = createHookWrapper()
    qc.setQueryData(['leaderboard', 'all', 'Easy'], [])

    const { result } = renderHook(
      () => useLeaderboard({ category: null, difficulty: 'Easy' }),
      { wrapper }
    )

    expect(result.current.data).toEqual([])
  })

  it('fetches and returns normalized leaderboard rows', async () => {
    const { wrapper } = createHookWrapper()
    const { result } = renderHook(
      () => useLeaderboard({ category: null, difficulty: null }),
      { wrapper }
    )

    await waitFor(() => expect(result.current.isPending).toBe(false))

    expect(result.current.data[0].userId).toBe(MOCK_LEADERBOARD[0].user_id)
    expect(result.current.data[0].firstName).toBe(MOCK_LEADERBOARD[0].first_name)
    expect(result.current.data[0].timeTaken).toBe(MOCK_LEADERBOARD[0].time_taken)
  })
})
