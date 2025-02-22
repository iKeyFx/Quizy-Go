import styled from "styled-components";
import QuizzyLogo from "../asset/quizzy-wh.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router";

const StyledLogo = styled(NavLink)`
  cursor: pointer;
`;
function LogoWhite({ user }) {
  return (
    <StyledLogo to={user ? "/dashboard" : "/"}>
      <LazyLoadImage src={QuizzyLogo} alt="quizy logo" />
    </StyledLogo>
  );
}

export default LogoWhite;
