import styled from "styled-components";
import QuizOption from "../features/quizscreen/QuizOption";
import AnswerReviewOption from "../features/quizscreen/AnswerReviewOprions";

const StyledQuizOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;
`;

const QuestionDiv = styled.div`
  color: var(--color-primary);
  text-align: center;

  h3 {
    font-size: 1.25rem;
    margin: 0 0 0.5rem;
    font-weight: 600;
    word-wrap: break-word;
    /* max-width: 600px; */
  }

  @media (max-width: 500px) {
    h3 {
      font-size: 0.9rem;
      margin: 0 0 0.5rem;
    }
  }
`;
function AnswerReveiwCard({ question, options, userAnswer, correctOption }) {
  // console.log(userAnswer);
  return (
    <>
      <QuestionDiv>
        <h3>{question}</h3>
      </QuestionDiv>

      <StyledQuizOptions>
        {options?.map((option, index) => (
          <AnswerReviewOption
            key={index}
            alphabet={String.fromCharCode(65 + index)}
            option={option}
            userAnswer={userAnswer}
            correctOption={correctOption}
          />
        ))}
      </StyledQuizOptions>
    </>
  );
}

export default AnswerReveiwCard;
