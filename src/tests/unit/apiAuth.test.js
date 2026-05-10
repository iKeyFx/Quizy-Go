import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockSignInWithPassword = vi.fn()
const mockSignUp = vi.fn()

vi.mock('../../services/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signUp: mockSignUp,
    },
  },
}))

// Import after mock is set up
const { login, signUp } = await import('../../services/apiAuth')

describe('login()', () => {
  beforeEach(() => {
    mockSignInWithPassword.mockReset()
  })

  it('calls signInWithPassword with correct email and password', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({
      data: {
        user: {
          id: 'user-1',
          email: 'test@test.com',
          user_metadata: { firstName: 'Alice', lastName: 'Smith' },
        },
      },
      error: null,
    })

    await login({ email: 'test@test.com', password: 'secret123' })

    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'secret123',
    })
  })

  it('returns normalized user with _id, email, firstName, lastName', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({
      data: {
        user: {
          id: 'user-1',
          email: 'test@test.com',
          user_metadata: { firstName: 'Alice', lastName: 'Smith' },
        },
      },
      error: null,
    })

    const result = await login({ email: 'test@test.com', password: 'secret123' })

    expect(result.data.user).toEqual({
      _id: 'user-1',
      email: 'test@test.com',
      firstName: 'Alice',
      lastName: 'Smith',
    })
  })

  it('maps missing user_metadata.firstName to empty string', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({
      data: {
        user: { id: 'u1', email: 'x@x.com', user_metadata: {} },
      },
      error: null,
    })

    const result = await login({ email: 'x@x.com', password: 'pass1234' })

    expect(result.data.user.firstName).toBe('')
    expect(result.data.user.lastName).toBe('')
  })

  it('throws an Error with the supabase error message on failure', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({
      data: null,
      error: { message: 'Invalid credentials' },
    })

    await expect(login({ email: 'x@x.com', password: 'wrong' })).rejects.toThrow(
      'Invalid credentials'
    )
  })
})

describe('signUp()', () => {
  beforeEach(() => {
    mockSignUp.mockReset()
  })

  it('calls signUp with email, password and firstName/lastName in metadata', async () => {
    mockSignUp.mockResolvedValueOnce({
      data: { id: 'new-user', email: 'new@test.com' },
      error: null,
    })

    await signUp({ email: 'new@test.com', password: 'Pass@123', fname: 'Bob', lname: 'Jones' })

    expect(mockSignUp).toHaveBeenCalledWith({
      email: 'new@test.com',
      password: 'Pass@123',
      options: {
        data: { firstName: 'Bob', lastName: 'Jones' },
      },
    })
  })

  it('returns raw supabase data on success', async () => {
    mockSignUp.mockResolvedValueOnce({
      data: { id: 'new-user', email: 'new@test.com' },
      error: null,
    })

    const result = await signUp({ email: 'new@test.com', password: 'Pass@123', fname: 'Bob', lname: 'Jones' })

    expect(result).toEqual({ id: 'new-user', email: 'new@test.com' })
  })

  it('throws an Error with the supabase error message on failure', async () => {
    mockSignUp.mockResolvedValueOnce({
      data: null,
      error: { message: 'Email already in use' },
    })

    await expect(
      signUp({ email: 'used@test.com', password: 'Pass@123', fname: 'A', lname: 'B' })
    ).rejects.toThrow('Email already in use')
  })
})
