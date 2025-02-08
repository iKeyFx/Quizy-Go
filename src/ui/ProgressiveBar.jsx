import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  /* margin-top: 1rem; */
`;
const ProgressBarContainer = styled.div`
  width: 30%;
  height: 10px;
  background-color: var(--color-white);
  border-radius: 5px;
  margin-top: 1rem;
  overflow: hidden;
  border: 1px solid var(--color-gray-text);
  flex: 1;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background-color: var(--color-green);
  border-radius: 5px;
  transition: width 0.3s ease;
`;

const ProgressText = styled.span`
  font-size: 14px;
  color: var(--color-gray-text);
  margin-top: 1rem;

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
function ProgressiveBar({ progress }) {
  return (
    <Container>
      <ProgressBarContainer>
        <ProgressBarFill style={{ width: `${progress}%` }} />
      </ProgressBarContainer>
      <ProgressText>{progress / 10}/10</ProgressText>
    </Container>
  );
}

export default ProgressiveBar;
