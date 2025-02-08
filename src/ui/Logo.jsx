import styled from "styled-components";
import QuizzyLogo from "../asset/quizzy.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router";

const StyledLogo = styled(NavLink)`
  cursor: pointer;
`;
function Logo() {
  return (
    <StyledLogo to="/">
      <LazyLoadImage src={QuizzyLogo} alt="quizy logo" />
    </StyledLogo>
  );
}

export default Logo;
