import { LazyLoadImage } from "react-lazy-load-image-component";
import womanImage from "../asset/design.png";
// import RocketIcon from "../asset/Rocket.png";
import styled from "styled-components";

const StyledGSCon = styled.div`
  display: flex;
  /* flex-direction: row-reverse; */
  align-items: center;
  width: 100vw;
  justify-content: space-between;
  min-height: 100dvh;
`;

const StyledGSTextCon = styled.div`
  background-color: var(--color-white);
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  flex: 1;
  padding: 0 0rem 0 2rem;

  h2 {
    font-size: 32px;
  }

  p {
    font-size: 14px;
  }
`;

const StyledLUYMspan = styled.span`
  color: var(--color-primary);
`;
const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  color: var(--color-white);
  background-color: var(--color-primary);
  gap: 0.2rem;
  font-size: 18px;
  font-weight: 700;
  border: 2px;
  padding: 0.5rem 2.5rem;
  border-radius: var(--border-radius-lg);

  span {
    align-items: center;
    display: flex;
  }
`;
function GetStarted() {
  return (
    <StyledGSCon>
      <ImageContainer>
        <LazyLoadImage src={womanImage} alt="woman Image" />
      </ImageContainer>
      <StyledGSTextCon>
        <div>
          <h2>
            Test Your Knowledge,{" "}
            <StyledLUYMspan>Light Up Your Mind</StyledLUYMspan>
          </h2>
          <p>Challenge yourself with fun quizzes on different topics</p>
        </div>
        <div>
          <StyledButton>
            <span>{/* <img src={RocketIcon} alt="Rocket" /> */}</span>
            Get Started
          </StyledButton>
        </div>
      </StyledGSTextCon>
    </StyledGSCon>
  );
}

export default GetStarted;
