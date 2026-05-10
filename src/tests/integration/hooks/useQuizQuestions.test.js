import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { server } from '../../mocks/server'
import { MOCK_QUESTIONS } from '../../mocks/handlers'
import { createHookWrapper } from '../../utils/renderWithProviders'
import { useQuizQuestions } from '../../../features/quizscreen/useQuizQuestions'

describe('useQuizQuestions', () => {
  it('returns questions with correctOption field (renamed from correct_option)', async () => {
    const { wrapper } = createHookWrapper()
    const { result } = renderHook(
      () => useQuizQuestions({ category: 'Arts', difficulty: 'Easy' }),
      { wrapper }
    )

    await waitFor(() => expect(result.current.isPending).toBe(false))

    expect(result.current.data[0].correctOption).toBe(MOCK_QUESTIONS[0].correct_option)
  })

  it('isError is true when fetch fails', async () => {
    server.use(
      http.get('https://test.supabase.co/rest/v1/quiz_questions', () =>
        HttpResponse.json({ error: 'table not found' }, { status: 500 })
      )
    )

    const { wrapper } = createHookWrapper()
    const { result } = renderHook(
      () => useQuizQuestions({ category: 'Arts', difficulty: 'Easy' }),
      { wrapper }
    )

    await waitFor(() => expect(result.current.isError).toBe(true))
  })

  it('uses queryKey ["quiz_questions", category, difficulty]', () => {
    const { qc, wrapper } = createHookWrapper()
    qc.setQueryData(['quiz_questions', 'Science', 'Hard'], [])

    const { result } = renderHook(
      () => useQuizQuestions({ category: 'Science', difficulty: 'Hard' }),
      { wrapper }
    )

    expect(result.current.data).toEqual([])
  })
})
