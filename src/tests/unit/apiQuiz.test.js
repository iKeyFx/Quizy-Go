import { describe, it, expect, vi, beforeEach } from 'vitest'

const MOCK_DB_QUESTIONS = [
  {
    id: 1,
    category: 'Arts',
    difficulty: 'Easy',
    question: 'Who painted Mona Lisa?',
    options: ['Da Vinci', 'Picasso', 'Monet', 'Dali'],
    correct_option: 'Da Vinci',
  },
]

// Chainable builder mock
const builder = {
  select: vi.fn(),
  eq: vi.fn(),
}
builder.select.mockReturnValue(builder)

vi.mock('../../services/supabase', () => ({
  supabase: { from: vi.fn(() => builder) },
}))

const { getQuestions } = await import('../../services/apiQuiz')
const { supabase } = await import('../../services/supabase')

describe('getQuestions()', () => {
  beforeEach(() => {
    builder.select.mockClear()
    builder.eq.mockReset()
  })

  it('fetches from quiz_questions table', async () => {
    builder.eq.mockReturnValueOnce(builder).mockResolvedValueOnce({
      data: MOCK_DB_QUESTIONS,
      error: null,
    })

    await getQuestions({ category: 'Arts', difficulty: 'Easy' })

    expect(supabase.from).toHaveBeenCalledWith('quiz_questions')
  })

  it('filters by category and difficulty', async () => {
    builder.eq.mockReturnValueOnce(builder).mockResolvedValueOnce({
      data: MOCK_DB_QUESTIONS,
      error: null,
    })

    await getQuestions({ category: 'Arts', difficulty: 'Easy' })

    expect(builder.eq).toHaveBeenCalledWith('category', 'Arts')
    expect(builder.eq).toHaveBeenCalledWith('difficulty', 'Easy')
  })

  it('renames correct_option to correctOption in returned data', async () => {
    builder.eq.mockReturnValueOnce(builder).mockResolvedValueOnce({
      data: MOCK_DB_QUESTIONS,
      error: null,
    })

    const result = await getQuestions({ category: 'Arts', difficulty: 'Easy' })

    expect(result[0].correctOption).toBe('Da Vinci')
  })

  it('preserves all other question fields', async () => {
    builder.eq.mockReturnValueOnce(builder).mockResolvedValueOnce({
      data: MOCK_DB_QUESTIONS,
      error: null,
    })

    const result = await getQuestions({ category: 'Arts', difficulty: 'Easy' })

    expect(result[0].id).toBe(1)
    expect(result[0].question).toBe('Who painted Mona Lisa?')
    expect(result[0].options).toHaveLength(4)
  })

  it('returns empty array when data is empty', async () => {
    builder.eq.mockReturnValueOnce(builder).mockResolvedValueOnce({
      data: [],
      error: null,
    })

    const result = await getQuestions({ category: 'Arts', difficulty: 'Hard' })

    expect(result).toEqual([])
  })

  it('throws an Error with the supabase error message on failure', async () => {
    builder.eq.mockReturnValueOnce(builder).mockResolvedValueOnce({
      data: null,
      error: { message: 'relation does not exist' },
    })

    await expect(getQuestions({ category: 'Arts', difficulty: 'Easy' })).rejects.toThrow(
      'relation does not exist'
    )
  })
})
