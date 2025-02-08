import styled from "styled-components";

const StyledQuizOption = styled.div`
  /* min-width: calc(100vw - 100vh); */
  display: flex;
  align-items: center;
  background-color: var(--color-gray);
  border-radius: 10px;
  color: var(--color-primary);
  font-weight: 700;
  gap: 2rem;
  padding: 0.75rem 1.5rem;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid
    ${({ correctAnswer, userAnswered }) =>
      correctAnswer
        ? "var(--color-green)"
        : userAnswered
        ? "var(--color-soft-red)"
        : "none"};

  @media (max-width: 500px) {
    gap: 1rem;
    span {
      font-size: 0.9rem;
    }
  }
`;

const StyledQuizLetter = styled.div`
  background-color: var(--color-primary-1);
  color: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  font-weight: 600;
  width: 35px;
  height: 35px;
  flex-shrink: 0;

  @media (max-width: 500px) {
    span {
      font-size: 0.9rem;
    }
  }
`;
function AnswerReviewOption({ alphabet, option, correctOption, userAnswer }) {
  // console.log(userAnswer);
  const correctAnswer = correctOption === option;
  const userAnswered = userAnswer === option;
  return (
    <StyledQuizOption correctAnswer={correctAnswer} userAnswered={userAnswered}>
      <StyledQuizLetter>
        <span>{alphabet}</span>
      </StyledQuizLetter>
      <span>{option}</span>
    </StyledQuizOption>
  );
}

export default AnswerReviewOption;
