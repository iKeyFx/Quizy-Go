import styled from "styled-components";

import { useState } from "react";
import { IoCloseSharp, IoMenuOutline } from "react-icons/io5";

import LogoWhite from "./Logo-wh";

const StyledHeader = styled.header`
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 1rem 5rem;

  @media (max-width: 1020px) {
    padding: 1rem 3rem;
    font-size: 10px;
  }
  @media (max-width: 620px) {
    padding: 1rem 1rem;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  gap: 2rem;
  cursor: pointer;

  @media (max-width: 620px) {
    display: none;
  }
`;

const StyledButton = styled.button`
  color: var(--color-primary);
  background-color: var(--color-white);
  font-size: 16px;
  font-weight: 500;
  border: 2px;
  padding: 8px 32px;
  border-radius: 8px;

  &:hover {
    background-color: var(--color-gray);
    transition: linear 0.3s ease;
  }

  @media (max-width: 1020px) {
    padding: 8px 18px;
    font-size: 10px;
  }
`;

const StyledHambuger = styled.div`
  display: none;

  @media (max-width: 620px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const IconClose = styled(IoCloseSharp)`
  width: 100%;
  height: 30px;
  color: var(--color--green);
`;

const Icon = styled(IoMenuOutline)`
  width: 100%;
  height: 30px;
  color: var(--color--green);
`;

const DropdownMenu = styled.div`
  display: none;
  @media (max-width: 620px) {
    display: ${({ open }) => (open ? "flex" : "none")};
    flex-direction: column;
    background-color: var(--color-primary);
    width: 100%;
    padding: 1rem;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      padding: 0.5rem 0;
      cursor: pointer;
      color: var(--color-gray);
      &:hover {
        color: var(--color-white);
        transition: linear 0.3s ease;
      }
    }
  }
`;

const StyledDeskUl = styled.ul`
  list-style: none;
  display: flex;
  gap: 2.5rem;

  li {
    cursor: pointer;
    color: var(--color-gray);
    &:hover {
      color: var(--color-white);
      transition: linear 0.3s ease;
    }
  }
  @media (max-width: 620px) {
    display: none;
  }
`;
function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpen = () => {
    setOpenMenu(true);
  };
  const handleClose = () => {
    setOpenMenu(false);
  };

  return (
    <StyledHeader>
      <StyledNav>
        <LogoWhite />

        <StyledHambuger>
          {openMenu ? (
            <IconClose onClick={handleClose} />
          ) : (
            <Icon onClick={handleOpen} />
          )}
        </StyledHambuger>

        <StyledDeskUl>
          <li>Home</li>
          <li>About</li>
          <li>Features</li>
        </StyledDeskUl>

        <StyledButtonDiv>
          <p>Login</p>
          <StyledButton>Take A Quiz</StyledButton>
        </StyledButtonDiv>
      </StyledNav>
      <DropdownMenu open={openMenu}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Features</li>
          <li>Login</li>
          <li>
            <StyledButton>Take A Quiz</StyledButton>
          </li>
        </ul>
      </DropdownMenu>
    </StyledHeader>
  );
}

export default Header;
