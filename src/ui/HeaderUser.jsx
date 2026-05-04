import styled from "styled-components";

import { useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { IoCloseSharp, IoMenuOutline } from "react-icons/io5";
import LogoWhite from "./Logo-wh";
import NotificationIcon from "../asset/notifications_active.png";
import ProfileImage from "../asset/Avatar.png";
import HelpIcon from "../asset/help.png";
import { IoIosLogOut } from "react-icons/io";
import useLogout from "../features/authentication/useLogout";

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
const LogoutIcon = styled(IoIosLogOut)`
  width: 20px;
  height: 20px;

  &:hover {
    color: var(--color-gray-text);
  }

  @media (max-width: 620px) {
    display: none;
  }
`;
const LogoutDiv = styled.div`
  @media (max-width: 620px) {
    display: none;
  }
`;
const NotificationBellDiv = styled.div`
  display: none;
  @media (max-width: 620px) {
    display: block;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
`;

const ModalCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  z-index: 1001;
  min-width: 300px;

  @media (max-width: 500px) {
    padding: 2rem 1.5rem;
    min-width: 260px;
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--color-secondary-4);
  margin: 0;
  text-align: center;
`;

const ModalText = styled.p`
  font-size: 0.9rem;
  color: var(--color-gray-text);
  margin: 0;
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1.5px solid var(--color-gray-text);
  background: none;
  color: var(--color-secondary-4);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: var(--color-gray);
    transition: all 0.2s;
  }
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary-2);
    transition: all 0.2s;
  }
`;

function HeaderUser() {
  const [openMenu, setOpenMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logout = useLogout();
  const handleOpen = () => {
    setOpenMenu(true);
  };
  const handleClose = () => {
    setOpenMenu(false);
  };
  const handleLogoutClick = () => {
    setOpenMenu(false);
    setShowLogoutModal(true);
  };
  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  return (
    <>
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
          <NotificationBellDiv>
            <LazyLoadImage src={NotificationIcon} alt="notification Icon" />
          </NotificationBellDiv>
          <div>
            <LazyLoadImage src={HelpIcon} alt="help Icon" />
          </div>
          <LogoutDiv>
            <LogoutIcon onClick={handleLogoutClick} />
          </LogoutDiv>
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
            <StyledButton onClick={handleLogoutClick}>Log Out</StyledButton>
          </li>
        </ul>
      </DropdownMenu>
    </StyledHeader>

    {showLogoutModal &&
      createPortal(
        <ModalOverlay onClick={() => setShowLogoutModal(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Log Out</ModalTitle>
            <ModalText>Are you sure you want to log out?</ModalText>
            <ModalButtons>
              <CancelButton onClick={() => setShowLogoutModal(false)}>
                Cancel
              </CancelButton>
              <ConfirmButton onClick={handleConfirmLogout}>
                Log Out
              </ConfirmButton>
            </ModalButtons>
          </ModalCard>
        </ModalOverlay>,
        document.body
      )}
    </>
  );
}

export default HeaderUser;
