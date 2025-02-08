import styled from "styled-components";

import { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { IoCloseSharp, IoMenuOutline } from "react-icons/io5";
import LogoWhite from "./Logo-wh";
import NotificationIcon from "../asset/notifications_active.png";
import ProfileImage from "../asset/Avatar.png";
import HelpIcon from "../asset/help.png";

const StyledHeader = styled.header`
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 1rem 4rem;

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

  @media (max-width: 620px) {
    & > :nth-child(1) {
      order: 0;
    }
    & > :nth-child(2) {
      order: 3;
    }
    & > :nth-child(3) {
      order: 2;
    }
  }
`;

const StyledButtonDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  @media (max-width: 620px) {
    margin: 5px 0 0 auto;
    & > :first-child {
      display: none;
    }
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
    margin-left: 15px;
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

const Avatar = styled(LazyLoadImage)`
  width: 30px;
  height: 30px;
`;
function HeaderUser() {
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
        <LogoWhite user={true} />

        <StyledHambuger>
          {openMenu ? (
            <IconClose onClick={handleClose} />
          ) : (
            <Icon onClick={handleOpen} />
          )}
        </StyledHambuger>

        <StyledDeskUl>
          <li>
            <NavLink to="/dashboard">Leaderboard</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Setting</NavLink>
          </li>
        </StyledDeskUl>

        <StyledButtonDiv>
          <div>
            <Avatar src={ProfileImage} alt="Avatar" />
          </div>
          <div>
            <LazyLoadImage src={NotificationIcon} alt="notification Icon" />
          </div>
          <div>
            <LazyLoadImage src={HelpIcon} alt="help Icon" />
          </div>
        </StyledButtonDiv>
      </StyledNav>
      <DropdownMenu open={openMenu}>
        <ul>
          <li>
            <NavLink to="/dashboard">Leaderboard</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Setting</NavLink>
          </li>

          <li>
            <NavLink to="/dashboard">Help & Support</NavLink>
          </li>
          <li>
            <StyledButton>Take A Quiz</StyledButton>
          </li>
        </ul>
      </DropdownMenu>
    </StyledHeader>
  );
}

export default HeaderUser;
