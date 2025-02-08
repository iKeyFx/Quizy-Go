import styled from "styled-components";

import { FaFacebookF } from "react-icons/fa";
import { BiHide } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { RiAppleLine } from "react-icons/ri";
import { Link } from "react-router";

const StyledORCon = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledSignInLogo = styled.div`
  display: flex;
  gap: 1rem;

  div {
    background-color: var(--color-white);
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: var(--color-primary);
    cursor: pointer;
  }
`;

const StyledSignUpDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  p {
    font-weight: 300;
  }
  a {
    cursor: pointer;
  }
`;

const StyledOrDivTag = styled.div`
  color: var(--color-gray-text);
`;
function LoginToSignUp({ pText, link, textLink, questionText }) {
  return (
    <StyledORCon>
      <StyledOrDivTag>
        <h3>OR</h3>
        <p>{pText}</p>
      </StyledOrDivTag>

      <StyledSignInLogo>
        <div>
          <RiAppleLine />
        </div>
        <div>
          <FcGoogle />
        </div>
        <div>
          {" "}
          <FaFacebookF />
        </div>
      </StyledSignInLogo>
      <StyledSignUpDiv>
        <p>{questionText}</p>
        <Link to={link}>{textLink}</Link>
      </StyledSignUpDiv>
    </StyledORCon>
  );
}

export default LoginToSignUp;
