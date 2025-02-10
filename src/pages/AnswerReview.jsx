import styled from "styled-components";
import QuestionComponent from "../components/QuestionComponent";
import AnswerReveiwCard from "../components/AnswerReviewComponent";
import quizQuestions from "../data/quizTestQuestion";
import { useLocation } from "react-router";

const Container = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  color: var(--color-primary);

  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;

  h2 {
    margin: 0;
  }
  p {
    margin: 1rem;
  }

  @media (max-width: 500px) {
    h2 {
      font-size: 1rem;
    }

    p {
      font-size: 0.8rem;
    }
  }
`;
const ReviewContainer = styled.div`
  max-width: 600px;
  width: 100%;
`;
const ResultDiv = styled.div`
  display: flex;
  gap: 3rem;
  margin: 2rem 0;

  width: 100%;
  align-items: flex-start;
  span {
    font-size: 1rem;
    color: var(--color-primary);
  }

  @media (max-width: 500px) {
    gap: 1rem;
  }
`;
const AnswerContainer = styled.div`
  flex: 1;
  width: 100%;
`;
function AnswerReview() {
  const location = useLocation();
  const { results, filteredQuestions } = location.state || {};
  return (
    <Container>
      <ReviewContainer>
        <div>
          <div>
            <h2>Hey Champ!</h2>
            <p>View your answer here</p>
          </div>

          <div>
            {filteredQuestions?.map((question, index) => {
              const userAnswer = results[index]?.userAnswer;
              return (
                <ResultDiv key={index}>
                  <span>{index + 1}</span>
                  <AnswerContainer>
                    <AnswerReveiwCard
                      question={question.question}
                      options={question.options}
                      correctOption={question.correctOption}
                      userAnswer={userAnswer}
                    />
                  </AnswerContainer>
                </ResultDiv>
              );
            })}
            {/* <ResultDiv>
            <span>1</span>
            <div>
              <AnswerReveiwCard
                question="Which of the following is responsible for the greenhouse effect on Earth?"
                options={["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"]}
                correctOption="Oxygen"
                userAnswer="Hydrogen"
              />
            </div>
          </ResultDiv> */}
          </div>
        </div>
      </ReviewContainer>
    </Container>
  );
}

export default AnswerReview;
