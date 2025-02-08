import styled from "styled-components";

import { LazyLoadImage } from "react-lazy-load-image-component";

import Logo from "./Logo";
import womanImage from "../asset/design.png";
import { useEffect, useState } from "react";

const StyledLoginDiv1 = styled.div`
  padding: 2rem 1rem;
  flex: 1;
  display: grid;
  & > :first-child {
    padding: 0rem 0 0 3rem;
  }
  h4 {
    color: var(--color-gray-text);
    font-weight: 500;
    font-size: 14px;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;
const StyledLoginImageCon = styled.div`
  text-align: center;
`;
const StyledSandPB = styled.div`
  display: flex;
  align-items: first baseline;
  justify-content: space-around;
  cursor: pointer;
`;
const ProgressBarContainer = styled.div`
  width: 30%;
  height: 10px;
  background-color: var(--color-primary-3);
  border-radius: 5px;
  margin-top: 1rem;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 5px;
  transition: width 0.3s ease;
`;
function LoginDeskSideOne() {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("Take a Quiz and increase your knwoledge");
  useEffect(() => {
    if (progress == 25) {
      setText("Play a Quiz and challenge yourself");
    } else if (progress == 50) {
      setText("Take this quiz and boost your brainpower!");
    } else if (progress == 75) {
      setText("Answer these questions and learn something new!");
    } else if (progress == 100) {
      setText("Take this quiz and sharpen your skills!");
    }
  }, [setText, progress]);
  const handleSkip = () => {
    if (progress < 100) {
      setProgress((prevProgress) => prevProgress + 25);
    }
  };
  return (
    <StyledLoginDiv1>
      <Logo />
      <StyledLoginImageCon>
        <LazyLoadImage src={womanImage} alt="Creative Image" />
        <h4>{text}</h4>

        <StyledSandPB>
          <p onClick={handleSkip}>Skip</p>
          <ProgressBarContainer>
            <ProgressBarFill style={{ width: `${progress}%` }} />
          </ProgressBarContainer>
        </StyledSandPB>
      </StyledLoginImageCon>
    </StyledLoginDiv1>
  );
}

export default LoginDeskSideOne;
