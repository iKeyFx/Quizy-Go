import styled from "styled-components";
import QuizzyLogo from "../asset/quizzy-wh.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const StyledLogo = styled.a`
  cursor: pointer;
`;
function LogoWhite() {
  return (
    <StyledLogo>
      <LazyLoadImage src={QuizzyLogo} alt="quizy logo" />
    </StyledLogo>
  );
}

export default LogoWhite;
