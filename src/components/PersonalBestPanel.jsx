import styled from "styled-components";
import { formatTime } from "../util/FormatTime";

const PanelWrapper = styled.div`
  margin-bottom: 2rem;
`;

const PanelTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.75rem;
`;

const CardsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const BestCard = styled.div`
  border: 1.5px solid var(--color-primary);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  min-width: 160px;
  background-color: var(--color-white);

  p {
    margin: 0;
    font-size: 0.78rem;
    color: var(--color-gray-text);
  }

  strong {
    display: block;
    font-size: 1.1rem;
    color: var(--color-primary);
    margin-bottom: 0.25rem;
  }

  span {
    font-size: 0.78rem;
    color: var(--color-gray-text);
  }
`;

const EmptyText = styled.p`
  font-size: 0.85rem;
  color: var(--color-gray-text);
`;

function PersonalBestPanel({ bests }) {
  return (
    <PanelWrapper>
      <PanelTitle>Your Personal Bests</PanelTitle>
      {bests.length === 0 ? (
        <EmptyText>Complete a quiz to see your personal best.</EmptyText>
      ) : (
        <CardsGrid>
          {bests.map((entry) => (
            <BestCard key={`${entry.category}|${entry.difficulty}`}>
              <strong>{entry.score}/10</strong>
              <p>
                {entry.category} · {entry.difficulty}
              </p>
              <span>Best time: {formatTime(entry.timeTaken)}</span>
            </BestCard>
          ))}
        </CardsGrid>
      )}
    </PanelWrapper>
  );
}

export default PersonalBestPanel;
