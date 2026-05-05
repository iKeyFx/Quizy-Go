import styled from "styled-components";
import { formatTime } from "../util/FormatTime";

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const HideOnMobile = styled.td`
  @media (max-width: 600px) {
    display: none;
  }
`;

const HideOnMobileTh = styled.th`
  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  thead tr {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  th,
  td {
    padding: 0.75rem 1rem;
    text-align: left;
    white-space: nowrap;

    @media (max-width: 600px) {
      padding: 0.5rem 0.6rem;
      font-size: 0.8rem;
    }
  }

  th {
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.03em;
  }

  tbody tr {
    border-bottom: 1px solid var(--color-gray);
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--color-gray);
    }
  }
`;

const HighlightedRow = styled.tr`
  background-color: rgba(var(--color-primary-rgb, 67, 56, 202), 0.08) !important;
  font-weight: 600;
  border-left: 3px solid var(--color-primary);
`;

const RankCell = styled.td`
  font-weight: 700;
  color: ${({ rank }) =>
    rank === 1
      ? "#f59e0b"
      : rank === 2
      ? "#9ca3af"
      : rank === 3
      ? "#cd7c3f"
      : "var(--color-primary)"};
`;

const StatusText = styled.p`
  text-align: center;
  color: var(--color-gray-text);
  padding: 2rem 0;
`;

const SkeletonRow = styled.tr`
  td {
    padding: 0.75rem 1rem;
  }
`;

const SkeletonCell = styled.div`
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--color-gray) 25%, #e5e7eb 50%, var(--color-gray) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  width: ${({ width }) => width || "80%"};

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

function LeaderboardTable({ entries, currentUserId, isLoading, isError }) {
  if (isError)
    return (
      <StatusText>Failed to load leaderboard. Please try again.</StatusText>
    );

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <HideOnMobileTh>Category</HideOnMobileTh>
            <HideOnMobileTh>Difficulty</HideOnMobileTh>
            <th>Score</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i}>
                  {Array.from({ length: 7 }).map((_, j) => {
                    const Cell = j === 2 || j === 3 ? HideOnMobile : "td";
                    return (
                      <Cell key={j}>
                        <SkeletonCell width={j === 0 ? "30px" : "70%"} />
                      </Cell>
                    );
                  })}
                </SkeletonRow>
              ))
            : entries.length === 0
            ? null
            : entries.map((entry, index) => {
                const rank = index + 1;
                const isCurrentUser = entry.userId === currentUserId;
                const Row = isCurrentUser ? HighlightedRow : "tr";
                return (
                  <Row key={entry.id}>
                    <RankCell as="td" rank={rank}>
                      {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank}
                    </RankCell>
                    <td>
                      {entry.firstName} {entry.lastName}
                      {isCurrentUser && (
                        <span style={{ fontSize: "0.75rem", marginLeft: "0.4rem", color: "var(--color-primary)" }}>
                          (you)
                        </span>
                      )}
                    </td>
                    <HideOnMobile>{entry.category}</HideOnMobile>
                    <HideOnMobile>{entry.difficulty}</HideOnMobile>
                    <td>{entry.score}/10</td>
                    <td>{formatTime(entry.timeTaken)}</td>
                    <td>{new Date(entry.playedAt).toLocaleDateString()}</td>
                  </Row>
                );
              })}
        </tbody>
      </StyledTable>
      {!isLoading && entries.length === 0 && (
        <StatusText>No scores yet. Be the first to complete a quiz!</StatusText>
      )}
    </TableWrapper>
  );
}

export default LeaderboardTable;
