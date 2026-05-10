import { describe, it, expect } from 'vitest'
import { VALID_CATEGORIES, VALID_DIFFICULTIES } from '../../data/constants'

describe('VALID_CATEGORIES', () => {
  it('contains exactly 4 entries', () => {
    expect(VALID_CATEGORIES).toHaveLength(4)
  })

  it('contains Arts, Science, Commercial, General Studies', () => {
    expect(VALID_CATEGORIES).toEqual(['Arts', 'Science', 'Commercial', 'General Studies'])
  })

  it('does not contain empty strings', () => {
    expect(VALID_CATEGORIES.every((c) => c.length > 0)).toBe(true)
  })

  it('has no duplicates', () => {
    expect(new Set(VALID_CATEGORIES).size).toBe(VALID_CATEGORIES.length)
  })

  it('all values are strings', () => {
    expect(VALID_CATEGORIES.every((c) => typeof c === 'string')).toBe(true)
  })
})

describe('VALID_DIFFICULTIES', () => {
  it('contains exactly 3 entries', () => {
    expect(VALID_DIFFICULTIES).toHaveLength(3)
  })

  it('contains Easy, Medium, Hard', () => {
    expect(VALID_DIFFICULTIES).toEqual(['Easy', 'Medium', 'Hard'])
  })

  it('does not contain empty strings', () => {
    expect(VALID_DIFFICULTIES.every((d) => d.length > 0)).toBe(true)
  })

  it('has no duplicates', () => {
    expect(new Set(VALID_DIFFICULTIES).size).toBe(VALID_DIFFICULTIES.length)
  })

  it('all values are strings', () => {
    expect(VALID_DIFFICULTIES.every((d) => typeof d === 'string')).toBe(true)
  })
})
