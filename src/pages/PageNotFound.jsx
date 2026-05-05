import styled from "styled-components";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import { Navigate, useLocation } from "react-router";
import { VALID_CATEGORIES, VALID_DIFFICULTIES } from "../data/constants";

const StyledPage = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--color-primary);
  /* padding: 1rem; */

  p {
    color: var(--color-soft-red);
  }

  div {
    background-color: var(--color-gray-text);
    /* width: 100%; */
    padding: 1rem;
  }
`;

function PageNotFound() {
  const location = useLocation();
  const activeQuizUrl = localStorage.getItem("activeQuizUrl");

  if (activeQuizUrl) {
    // Validate before redirecting to prevent loops
    // 1. Ensure it starts with '/' (safe app path)
    // 2. Ensure it matches the quiz URL pattern
    // 3. Validate category and difficulty
    // 4. Ensure it's not equal to current location (avoid redirect-to-self)

    if (activeQuizUrl.startsWith('/') && activeQuizUrl !== location.pathname) {
      const quizUrlPattern = /^\/quiz\/([^/]+)\/([^/]+)$/;
      const match = activeQuizUrl.match(quizUrlPattern);

      if (match) {
        const [, category, difficulty] = match;
        if (VALID_CATEGORIES.includes(category) && VALID_DIFFICULTIES.includes(difficulty)) {
          return <Navigate to={activeQuizUrl} replace />;
        }
      }
    }

    // If any validation fails, clear the stale value
    localStorage.removeItem("activeQuizUrl");
  }

  return (
    <StyledPage>
      <Header />
      <StyledMain>
        <div>
          <h2>The page you're looking for can't be found.</h2>
          <p>Please check the URL and try again.</p>
        </div>
      </StyledMain>
      <Footer />
    </StyledPage>
  );
}

export default PageNotFound;
