import styled from "styled-components";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

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
