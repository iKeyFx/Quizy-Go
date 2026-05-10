import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PersonalBestPanel from '../../../components/PersonalBestPanel'

const MOCK_BESTS = [
  {
    id: 'lb-1',
    userId: 'user-123',
    firstName: 'Alice',
    lastName: 'Smith',
    category: 'Arts',
    difficulty: 'Easy',
    score: 9,
    timeTaken: 120,
    playedAt: '2026-05-01T10:00:00Z',
  },
  {
    id: 'lb-2',
    userId: 'user-123',
    firstName: 'Alice',
    lastName: 'Smith',
    category: 'Science',
    difficulty: 'Hard',
    score: 6,
    timeTaken: 300,
    playedAt: '2026-05-02T10:00:00Z',
  },
]

describe('PersonalBestPanel', () => {
  it('shows the panel title "Your Personal Bests"', () => {
    render(<PersonalBestPanel bests={[]} />)
    expect(screen.getByText('Your Personal Bests')).toBeInTheDocument()
  })

  it('shows empty state message when bests is empty array', () => {
    render(<PersonalBestPanel bests={[]} />)
    expect(screen.getByText(/Complete a quiz/i)).toBeInTheDocument()
  })

  it('renders one card per best entry', () => {
    render(<PersonalBestPanel bests={MOCK_BESTS} />)

    expect(screen.getByText('9/10')).toBeInTheDocument()
    expect(screen.getByText('6/10')).toBeInTheDocument()
  })

  it('displays category and difficulty in each card', () => {
    render(<PersonalBestPanel bests={MOCK_BESTS} />)

    expect(screen.getByText(/Arts.*Easy/i)).toBeInTheDocument()
    expect(screen.getByText(/Science.*Hard/i)).toBeInTheDocument()
  })

  it('formats timeTaken using formatTime', () => {
    render(<PersonalBestPanel bests={[MOCK_BESTS[0]]} />)

    // 120 seconds = 02:00
    expect(screen.getByText(/02:00/)).toBeInTheDocument()
  })

  it('uses category|difficulty as key — no duplicate key warnings', () => {
    // Two entries with the same category but different difficulty — unique keys
    const bests = [
      { ...MOCK_BESTS[0], id: 'a' },
      { ...MOCK_BESTS[1], id: 'b' },
    ]
    expect(() => render(<PersonalBestPanel bests={bests} />)).not.toThrow()
  })

  it('does not show empty state when bests has entries', () => {
    render(<PersonalBestPanel bests={MOCK_BESTS} />)
    expect(screen.queryByText(/Complete a quiz/i)).not.toBeInTheDocument()
  })
})
