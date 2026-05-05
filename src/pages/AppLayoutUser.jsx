import styled from "styled-components";
import Dashboard from "./Dashboard";
import HeaderUser from "../ui/HeaderUser";
import { Navigate, Outlet, useLocation } from "react-router";
import { VALID_CATEGORIES, VALID_DIFFICULTIES } from "../data/constants";

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
    const match = activeQuizUrl.match(/^\/quiz\/([^/]+)\/([^/]+)$/);
    const isValid =
      match &&
      VALID_CATEGORIES.includes(decodeURIComponent(match[1])) &&
      VALID_DIFFICULTIES.includes(decodeURIComponent(match[2]));
    if (isValid) return <Navigate to={activeQuizUrl} replace />;
    localStorage.removeItem("activeQuizUrl");
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
