import { describe, it, expect, vi, beforeEach } from 'vitest'

const insertMock = vi.fn()
const orderMock = vi.fn()
const eqMock = vi.fn()
const selectMock = vi.fn()

// Full chainable builder for leaderboard (order, eq all chain)
const builder = {
  select: selectMock,
  insert: insertMock,
  order: orderMock,
  eq: eqMock,
}
selectMock.mockReturnValue(builder)
orderMock.mockReturnValue(builder)
eqMock.mockReturnValue(builder)

vi.mock('../../services/supabase', () => ({
  supabase: { from: vi.fn(() => builder) },
}))

const { submitScore, getLeaderboard, getPersonalBest } = await import(
  '../../services/apiLeaderboard'
)
const { supabase } = await import('../../services/supabase')

const MOCK_DB_ROWS = [
  {
    id: 'lb-1',
    user_id: 'u1',
    first_name: 'Alice',
    last_name: 'Smith',
    category: 'Arts',
    difficulty: 'Easy',
    score: 9,
    time_taken: 120,
    played_at: '2026-05-01T10:00:00Z',
  },
]

describe('submitScore()', () => {
  beforeEach(() => insertMock.mockReset())

  it('calls insert with correct snake_case payload', async () => {
    insertMock.mockResolvedValueOnce({ error: null })

    await submitScore({
      userId: 'u1',
      firstName: 'Alice',
      lastName: 'Smith',
      category: 'Arts',
      difficulty: 'Easy',
      score: 9,
      timeTaken: 120,
    })

    expect(insertMock).toHaveBeenCalledWith({
      user_id: 'u1',
      first_name: 'Alice',
      last_name: 'Smith',
      category: 'Arts',
      difficulty: 'Easy',
      score: 9,
      time_taken: 120,
    })
  })

  it('throws on supabase error', async () => {
    insertMock.mockResolvedValueOnce({ error: { message: 'RLS violation' } })

    await expect(
      submitScore({ userId: 'u1', firstName: 'A', lastName: 'B', category: 'Arts', difficulty: 'Easy', score: 5, timeTaken: 200 })
    ).rejects.toThrow('RLS violation')
  })
})

describe('getLeaderboard()', () => {
  beforeEach(() => {
    orderMock.mockReset()
    eqMock.mockReset()
    orderMock.mockReturnValue(builder)
    eqMock.mockReturnValue(builder)
  })

  it('orders by score descending then time_taken ascending', async () => {
    orderMock
      .mockReturnValueOnce(builder)
      .mockResolvedValueOnce({ data: MOCK_DB_ROWS, error: null })

    await getLeaderboard({})

    expect(orderMock).toHaveBeenCalledWith('score', { ascending: false })
    expect(orderMock).toHaveBeenCalledWith('time_taken', { ascending: true })
  })

  it('applies category filter when category is provided', async () => {
    // Single eq call (category only) — must resolve directly
    eqMock.mockResolvedValueOnce({ data: MOCK_DB_ROWS, error: null })

    await getLeaderboard({ category: 'Arts', difficulty: null })

    expect(eqMock).toHaveBeenCalledWith('category', 'Arts')
  })

  it('applies difficulty filter when difficulty is provided', async () => {
    // Single eq call (difficulty only) — must resolve directly
    eqMock.mockResolvedValueOnce({ data: MOCK_DB_ROWS, error: null })

    await getLeaderboard({ category: null, difficulty: 'Easy' })

    expect(eqMock).toHaveBeenCalledWith('difficulty', 'Easy')
  })

  it('applies no eq filters when both category and difficulty are falsy', async () => {
    orderMock
      .mockReturnValueOnce(builder)
      .mockResolvedValueOnce({ data: MOCK_DB_ROWS, error: null })

    await getLeaderboard({ category: null, difficulty: null })

    expect(eqMock).not.toHaveBeenCalled()
  })

  it('normalizes returned rows to camelCase', async () => {
    orderMock
      .mockReturnValueOnce(builder)
      .mockResolvedValueOnce({ data: MOCK_DB_ROWS, error: null })

    const result = await getLeaderboard({})

    expect(result[0]).toEqual({
      id: 'lb-1',
      userId: 'u1',
      firstName: 'Alice',
      lastName: 'Smith',
      category: 'Arts',
      difficulty: 'Easy',
      score: 9,
      timeTaken: 120,
      playedAt: '2026-05-01T10:00:00Z',
    })
  })

  it('throws on supabase error', async () => {
    orderMock
      .mockReturnValueOnce(builder)
      .mockResolvedValueOnce({ data: null, error: { message: 'table not found' } })

    await expect(getLeaderboard({})).rejects.toThrow('table not found')
  })
})

describe('getPersonalBest()', () => {
  beforeEach(() => {
    orderMock.mockReset()
    eqMock.mockReset()
    orderMock.mockReturnValue(builder)
    eqMock.mockReturnValue(builder)
  })

  it('filters by user_id', async () => {
    eqMock.mockReturnValueOnce(builder)
    orderMock
      .mockReturnValueOnce(builder)
      .mockResolvedValueOnce({ data: MOCK_DB_ROWS, error: null })

    await getPersonalBest('u1')

    expect(eqMock).toHaveBeenCalledWith('user_id', 'u1')
  })

  it('normalizes rows', async () => {
    eqMock.mockReturnValueOnce(builder)
    orderMock
      .mockReturnValueOnce(builder)
      .mockResolvedValueOnce({ data: MOCK_DB_ROWS, error: null })

    const result = await getPersonalBest('u1')

    expect(result[0].userId).toBe('u1')
    expect(result[0].firstName).toBe('Alice')
    expect(result[0].timeTaken).toBe(120)
  })

  it('throws on supabase error', async () => {
    eqMock.mockReturnValueOnce(builder)
    orderMock
      .mockReturnValueOnce(builder)
      .mockResolvedValueOnce({ data: null, error: { message: 'query failed' } })

    await expect(getPersonalBest('u1')).rejects.toThrow('query failed')
  })
})
