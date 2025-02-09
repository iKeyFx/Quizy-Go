import styled from "styled-components";

import { useState } from "react";
import { IoCloseSharp, IoMenuOutline } from "react-icons/io5";

import LogoWhite from "./Logo-wh";
import { Navigate, NavLink, useNavigate } from "react-router";

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
  align-items: center;
  gap: 2rem;
  cursor: pointer;

  @media (max-width: 620px) {
    display: none;
  }

  a {
    color: var(--color-white);

    &:hover {
      color: var(--color-gray-text);
      transition: linear 0.3s ease;
    }
  }
`;

const StyledButton = styled.button`
  color: var(--color-primary) !important;
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
    font-size: 10px;
    padding: 8px 18px;
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
  width: 30px;
  height: 30px;
`;

const Icon = styled(IoMenuOutline)`
  width: 30px;
  height: 30px;
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

    li,
    a {
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

  li,
  a {
    cursor: pointer;
    color: var(--color-gray);
    &:hover {
      color: var(--color-gray-text);
      transition: linear 0.3s ease;
    }
  }
  @media (max-width: 620px) {
    display: none;
  }
`;
function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
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
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/home/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/home/features">Features</NavLink>
          </li>
        </StyledDeskUl>

        <StyledButtonDiv>
          {/* <p> */}
          <NavLink to="login">Login</NavLink>
          {/* </p> */}
          <StyledButton onClick={() => navigate("/sign-up")}>
            Take A Quiz
          </StyledButton>
        </StyledButtonDiv>
      </StyledNav>
      <DropdownMenu open={openMenu}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/">About</NavLink>
          </li>
          <li>
            <NavLink to="/">Features</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <StyledButton>Take A Quiz</StyledButton>
          </li>
        </ul>
      </DropdownMenu>
    </StyledHeader>
  );
}

export default Header;
