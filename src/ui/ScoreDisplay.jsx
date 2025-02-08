import { createPortal } from "react-dom";
import { IoCloseSharp, IoShareSocialOutline } from "react-icons/io5";
import styled from "styled-components";
import { StyledButton } from "./ResultButton";
import { useLocation, useNavigate } from "react-router";

const Overlay = styled.div`
  /* background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  min-height: 100vh;
  position: absolute; */

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const StyledScoreDisplay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 500px) {
    padding: 2.5rem 2rem;
  }

  @media (max-width: 375px) {
    font-size: 12px;
    padding: 1rem 1rem;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 5%;
  right: 10%;

  &:hover {
    border: 1px solid var(--color-gray-text);
  }

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

const StyledH3 = styled.h3`
  font-size: 1.5rem;
  margin: 0.8rem 0 0;
  color: var(--color-secondary-4);

  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

const StyledCategorySpan = styled.span`
  font-size: 0.8rem;
  color: var(--color-gray-text);

  @media (max-width: 500px) {
    font-size: 0.5rem;
  }
`;

const StyledAnswerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-secondary-4);
  margin: 1rem 0;
  p {
    margin: 0.5rem 0;
    font-size: 14px;
  }
  span {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-white);
  width: 100%;
  justify-content: center;
  background-color: var(--color-primary-2);
  margin-top: 1rem;
  padding: 0.4rem;
  font-weight: 700;

  &:hover {
    background-color: var(--color-primary);
    transition: all 0.3s;
  }
`;
function ScoreDisplay() {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctAnswers, incorrectAnswers, results } = location.state || {};

  if (!location.state) {
    return <p>No results found. Please complete the quiz first.</p>;
  }

  return createPortal(
    <Overlay>
      <StyledScoreDisplay>
        <Button>
          <IoCloseSharp onClick={() => navigate("/dashboard")} />
        </Button>
        <StyledH3>Congratulations</StyledH3>
        <StyledCategorySpan>Categoty: Science</StyledCategorySpan>
        <StyledAnswerDiv>
          <p>You answered</p>
          <span>
            {correctAnswers}/{results.length}
          </span>
          <p>Question Correct</p>
        </StyledAnswerDiv>

        <ButtonDiv>
          <StyledButton
            onClick={() =>
              navigate("/quiz/answer-review", { state: location.state })
            }
          >
            View Answers
          </StyledButton>
          <StyledButton retry={true} onClick={() => navigate("/dashboard")}>
            Play Again
          </StyledButton>
        </ButtonDiv>
        <StyledShareButton>
          Share Result <IoShareSocialOutline />
        </StyledShareButton>
      </StyledScoreDisplay>
    </Overlay>,
    document.body
  );
}

export default ScoreDisplay;
