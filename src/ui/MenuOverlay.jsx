import { useEffect } from "react";
import styled from "styled-components";

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 50%;
  background-color: var(--color-primary);
  z-index: 0;
  display: flex;
  justify-content: flex-start;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  color: var(--color-white);
  &.visible {
    transform: translateX(0);
  }
`;

const StyledSidebar = styled.aside`
  width: 30%;
  min-height: 100dvh;
  padding: 1.8rem 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1020px) {
    width: 100%;
    justify-content: initial;
  }
`;

function MenuOverLay({ isVisible, children }) {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  return (
    <OverlayContainer className={isVisible ? "visible" : ""}>
      <StyledSidebar>{children}</StyledSidebar>
    </OverlayContainer>
  );
}

export default MenuOverLay;
