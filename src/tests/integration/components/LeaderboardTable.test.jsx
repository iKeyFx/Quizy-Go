import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LeaderboardTable from '../../../components/LeaderboardTable'

const MOCK_ENTRIES = [
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
    userId: 'user-456',
    firstName: 'Bob',
    lastName: 'Jones',
    category: 'Science',
    difficulty: 'Hard',
    score: 7,
    timeTaken: 300,
    playedAt: '2026-05-02T10:00:00Z',
  },
  {
    id: 'lb-3',
    userId: 'user-789',
    firstName: 'Carol',
    lastName: 'Williams',
    category: 'Commercial',
    difficulty: 'Medium',
    score: 6,
    timeTaken: 400,
    playedAt: '2026-05-03T10:00:00Z',
  },
  {
    id: 'lb-4',
    userId: 'user-000',
    firstName: 'Dave',
    lastName: 'Brown',
    category: 'General Studies',
    difficulty: 'Easy',
    score: 5,
    timeTaken: 450,
    playedAt: '2026-05-04T10:00:00Z',
  },
]

describe('LeaderboardTable', () => {
  it('shows 5 skeleton rows when isLoading is true', () => {
    const { container } = render(
      <LeaderboardTable
        entries={[]}
        currentUserId="user-123"
        isLoading={true}
        isError={false}
      />
    )

    const skeletonRows = container.querySelectorAll('tbody tr')
    expect(skeletonRows).toHaveLength(5)
  })

  it('shows error message when isError is true', () => {
    render(
      <LeaderboardTable
        entries={[]}
        currentUserId="user-123"
        isLoading={false}
        isError={true}
      />
    )

    expect(screen.getByText(/Failed to load leaderboard/i)).toBeInTheDocument()
  })

  it('shows "No scores yet" message when entries is empty and not loading', () => {
    render(
      <LeaderboardTable
        entries={[]}
        currentUserId="user-123"
        isLoading={false}
        isError={false}
      />
    )

    expect(screen.getByText(/No scores yet/i)).toBeInTheDocument()
  })

  it('renders one row per entry', () => {
    const { container } = render(
      <LeaderboardTable
        entries={MOCK_ENTRIES}
        currentUserId="user-123"
        isLoading={false}
        isError={false}
      />
    )

    const bodyRows = container.querySelectorAll('tbody tr')
    expect(bodyRows).toHaveLength(MOCK_ENTRIES.length)
  })

  it('highlights the current user row', () => {
    render(
      <LeaderboardTable
        entries={MOCK_ENTRIES}
        currentUserId="user-123"
        isLoading={false}
        isError={false}
      />
    )

    expect(screen.getByText('(you)')).toBeInTheDocument()
  })

  it('shows (you) annotation next to current user name', () => {
    render(
      <LeaderboardTable
        entries={MOCK_ENTRIES}
        currentUserId="user-123"
        isLoading={false}
        isError={false}
      />
    )

    expect(screen.getByText('(you)')).toBeInTheDocument()
  })

  it('shows gold medal emoji for rank 1', () => {
    render(
      <LeaderboardTable
        entries={MOCK_ENTRIES}
        currentUserId="other-user"
        isLoading={false}
        isError={false}
      />
    )

    expect(screen.getByText('🥇')).toBeInTheDocument()
  })

  it('shows silver medal emoji for rank 2', () => {
    render(
      <LeaderboardTable
        entries={MOCK_ENTRIES}
        currentUserId="other-user"
        isLoading={false}
        isError={false}
      />
    )

    expect(screen.getByText('🥈')).toBeInTheDocument()
  })

  it('shows bronze medal emoji for rank 3', () => {
    render(
      <LeaderboardTable
        entries={MOCK_ENTRIES}
        currentUserId="other-user"
        isLoading={false}
        isError={false}
      />
    )

    expect(screen.getByText('🥉')).toBeInTheDocument()
  })

  it('shows numeric rank for rank 4 and above', () => {
    render(
      <LeaderboardTable
        entries={MOCK_ENTRIES}
        currentUserId="other-user"
        isLoading={false}
        isError={false}
      />
    )

    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('formats score as score/10', () => {
    render(
      <LeaderboardTable
        entries={[MOCK_ENTRIES[0]]}
        currentUserId="other-user"
        isLoading={false}
        isError={false}
      />
    )

    expect(screen.getByText('9/10')).toBeInTheDocument()
  })

  it('formats timeTaken using formatTime', () => {
    render(
      <LeaderboardTable
        entries={[MOCK_ENTRIES[0]]}
        currentUserId="other-user"
        isLoading={false}
        isError={false}
      />
    )

    // 120 seconds = 02:00
    expect(screen.getByText('02:00')).toBeInTheDocument()
  })
})
