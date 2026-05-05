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
    // Validate the stored URL before redirecting
    const quizUrlPattern = /^\/quiz\/([^/]+)\/([^/]+)$/;
    const match = activeQuizUrl.match(quizUrlPattern);

    if (match) {
      const [, category, difficulty] = match;
      // Check if category and difficulty are valid
      if (VALID_CATEGORIES.includes(category) && VALID_DIFFICULTIES.includes(difficulty)) {
        return <Navigate to={activeQuizUrl} replace />;
      }
    }

    // If validation fails, clear the stale value
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
