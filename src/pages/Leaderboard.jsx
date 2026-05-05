import { useState } from "react";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import useLeaderboard from "../features/leaderboard/useLeaderboard";
import usePersonalBest from "../features/leaderboard/usePersonalBest";
import LeaderboardFilters from "../components/LeaderboardFilters";
import LeaderboardTable from "../components/LeaderboardTable";
import PersonalBestPanel from "../components/PersonalBestPanel";

const StyledLeaderboard = styled.div`
  padding: 2rem 4rem;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem;
  }

  @media (max-width: 500px) {
    padding: 1rem 1rem;
  }
`;

const PageTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
`;

function Leaderboard() {
  const { user } = useUser();
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const {
    data: entries = [],
    isLoading,
    isError,
  } = useLeaderboard({ category, difficulty });

  const { data: personalBests = [] } = usePersonalBest(user?._id);

  const grouped = personalBests.reduce((acc, row) => {
    const key = `${row.category}|${row.difficulty}`;
    if (!acc[key]) acc[key] = row;
    return acc;
  }, {});

  return (
    <StyledLeaderboard>
      <PageTitle>Leaderboard</PageTitle>
      <LeaderboardFilters
        category={category}
        difficulty={difficulty}
        onCategoryChange={setCategory}
        onDifficultyChange={setDifficulty}
      />
      <PersonalBestPanel bests={Object.values(grouped)} />
      <LeaderboardTable
        entries={entries}
        currentUserId={user?._id}
        isLoading={isLoading}
        isError={isError}
      />
    </StyledLeaderboard>
  );
}

export default Leaderboard;
