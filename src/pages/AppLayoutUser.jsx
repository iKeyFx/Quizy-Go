import styled from "styled-components";
import Dashboard from "./Dashboard";
import HeaderUser from "../ui/HeaderUser";
import { Outlet } from "react-router";

const StyledAppMain = styled.main`
  padding: 3rem 5rem;
  /* position: relative; */

  @media (max-width: 500px) {
    padding: 2rem 2rem;
  }
`;
function AppLayoutUser() {
  return (
    <div>
      <HeaderUser />
      <StyledAppMain>
        <Outlet />
      </StyledAppMain>
    </div>
  );
}

export default AppLayoutUser;
