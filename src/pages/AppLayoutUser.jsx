import styled from "styled-components";
import Dashboard from "./Dashboard";
import HeaderUser from "../ui/HeaderUser";
import { Navigate, Outlet, useLocation } from "react-router";

const StyledAppMain = styled.main`
  padding: 3rem 5rem;
  /* position: relative; */

  @media (max-width: 500px) {
    padding: 2rem 2rem;
  }
`;
function AppLayoutUser() {
  const location = useLocation();
  const isQuizActive = /^\/quiz\/[^/]+\/[^/]+$/.test(location.pathname);

  const activeQuizUrl = localStorage.getItem("activeQuizUrl");
  if (activeQuizUrl && location.pathname !== activeQuizUrl) {
    return <Navigate to={activeQuizUrl} replace />;
  }

  return (
    <div>
      {!isQuizActive && <HeaderUser />}
      <StyledAppMain>
        <Outlet />
      </StyledAppMain>
    </div>
  );
}

export default AppLayoutUser;
