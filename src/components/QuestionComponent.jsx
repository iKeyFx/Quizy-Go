import styled from "styled-components";
import QuizOption from "../features/quizscreen/QuizOption";

const StyledQuizOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const QuestionDiv = styled.div`
  color: var(--color-primary);
  text-align: center;
  width: 100%;

  h3 {
    font-size: 1.25rem;
    margin: 0;
    font-weight: 600;
  }

  @media (max-width: 500px) {
    h3 {
      font-size: 1rem;
      margin: 0;
      font-weight: 500;
    }
  }
`;
function QuestionComponent({
  question,
  options,
  onOptionClick,
  selectedOption,
}) {
  return (
    <>
      <QuestionDiv>
        <h3>{question}</h3>
      </QuestionDiv>

      <StyledQuizOptions>
        {options?.map((option, index) => (
          <QuizOption
            key={index}
            alphabet={String.fromCharCode(65 + index)}
            option={option}
            onOptionClick={onOptionClick}
            selectedOption={selectedOption}
          />
        ))}
      </StyledQuizOptions>
    </>
  );
}

export default QuestionComponent;
