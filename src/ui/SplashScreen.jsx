import styled from "styled-components";
import QuizzyGo from "../asset/quizzy.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
const StyledSplash = styled.div`
  display: flex;
  min-height: 100dvh;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledImg = styled(LazyLoadImage)`
  animation: zoom-in-zoom-out 3s ease-in-out infinite;
  /* width: 226px;
  height: 58px; */

  @keyframes zoom-in-zoom-out {
    0% {
      scale: 100%;
    }
    50% {
      scale: 150%;
    }
    100% {
      scale: 100%;
    }
  }
`;
function SplashScreen() {
  return (
    <StyledSplash>
      <StyledImg src={QuizzyGo} alt="QuizzyGo" />
    </StyledSplash>
  );
}

export default SplashScreen;
