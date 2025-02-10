import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import Button from "./Button";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-primary-2);
  border: 1px solid var(--color-gray-text);
  border-radius: var(--border-radius-lg);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h2 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Rubik";
    margin-bottom: 3.2rem;
    color: var(--color-soft-red);
  }
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <h2>Something went wrong 🥺</h2>
          <p>{error.message}</p>
          <Button sizes="large" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
