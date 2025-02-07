import styled from "styled-components";
import LogoWhite from "./Logo-wh";
import { FaFacebookF, FaRegCopyright } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const StyledFooter = styled.footer`
  background-color: var(--color-primary);
  display: grid;
  color: var(--color-gray);
  position: relative;
`;

const StyledFooterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;

  ul {
    list-style: none;
    display: flex;
    gap: 2rem;
    font-size: 12px;
  }

  li {
    cursor: pointer;
  }

  @media (max-width: 640px) {
    align-items: center;
    ul {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
      font-size: 12px;
    }
  }

  @media (max-width: 500px) {
    display: flex;
    place-items: center;
    flex-direction: column;
  }
`;
const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #1976d2;

  @media (max-width: 500px) {
    gap: 8rem;
  }
`;

const StyledCopyRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  position: absolute;
  bottom: 2%;
  right: 0;
  left: 0;
`;
function Footer() {
  return (
    <StyledFooter>
      <StyledFooterDiv>
        <LogoWhite />
        <ul>
          <li>Tools</li>
          <li>FAQ</li>
          <li>Privacy</li>
          <li>Terms & Conditions</li>
          <li>Contact</li>
        </ul>

        <StyledIcon>
          <div>
            <FcGoogle />
          </div>
          <div>
            <FaFacebookF />
          </div>
        </StyledIcon>
      </StyledFooterDiv>
      <StyledCopyRight>
        <FaRegCopyright />
        2025
      </StyledCopyRight>
    </StyledFooter>
  );
}

export default Footer;
