import { http, HttpResponse } from 'msw'

const BASE = 'https://test.supabase.co'

export const MOCK_USER = {
  id: 'user-123',
  email: 'alice@test.com',
  user_metadata: { firstName: 'Alice', lastName: 'Smith' },
}

export const MOCK_NORMALIZED_USER = {
  _id: 'user-123',
  email: 'alice@test.com',
  firstName: 'Alice',
  lastName: 'Smith',
}

export const MOCK_QUESTIONS = [
  {
    id: 1,
    category: 'Arts',
    difficulty: 'Easy',
    question: 'Who painted Mona Lisa?',
    options: ['Da Vinci', 'Picasso', 'Monet', 'Dali'],
    correct_option: 'Da Vinci',
  },
  {
    id: 2,
    category: 'Arts',
    difficulty: 'Easy',
    question: 'Which art movement is Salvador Dali associated with?',
    options: ['Surrealism', 'Cubism', 'Realism', 'Impressionism'],
    correct_option: 'Surrealism',
  },
]

export const MOCK_LEADERBOARD = [
  {
    id: 'lb-1',
    user_id: 'user-123',
    first_name: 'Alice',
    last_name: 'Smith',
    category: 'Arts',
    difficulty: 'Easy',
    score: 9,
    time_taken: 120,
    played_at: '2026-05-01T10:00:00Z',
  },
  {
    id: 'lb-2',
    user_id: 'user-456',
    first_name: 'Bob',
    last_name: 'Jones',
    category: 'Arts',
    difficulty: 'Easy',
    score: 7,
    time_taken: 300,
    played_at: '2026-05-02T10:00:00Z',
  },
]

export const handlers = [
  http.post(`${BASE}/auth/v1/token`, () =>
    HttpResponse.json({
      access_token: 'mock-token',
      token_type: 'bearer',
      user: MOCK_USER,
    })
  ),

  http.post(`${BASE}/auth/v1/signup`, () =>
    HttpResponse.json({ id: 'new-user-456', email: 'new@test.com' })
  ),

  http.post(`${BASE}/auth/v1/logout`, () => HttpResponse.json({})),

  http.get(`${BASE}/rest/v1/quiz_questions`, () =>
    HttpResponse.json(MOCK_QUESTIONS)
  ),

  http.get(`${BASE}/rest/v1/leaderboard`, () =>
    HttpResponse.json(MOCK_LEADERBOARD)
  ),

  http.post(`${BASE}/rest/v1/leaderboard`, () =>
    HttpResponse.json({}, { status: 201 })
  ),
]
