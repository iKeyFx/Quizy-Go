import styled from "styled-components";
import Logo from "../../ui/Logo";

import LoginForm from "../../ui/LoginForm";
import LoginDeskSideOne from "../../ui/LoginDeskSideOne";
import LoginToSignUp from "../../ui/LoginToSignUp";
import useLogin from "./useLogin";
import SplashScreen from "../../ui/SplashScreen";

export const StyledLogin = styled.div`
  display: flex;
  padding: 2rem;
  color: var(--color-primary);
  min-height: 100dvh;
  padding: 0;
`;

export const StyledLoginDiv2 = styled.div`
  flex: 1;
  background-color: var(--color-primary);
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  border-radius: 10px 0px 0px 10px;

  @media (max-width: 700px) {
    border-radius: 0;
  }
`;

export const StyledTextCon = styled.div`
  width: 80%;

  h3 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 500px) {
    h3 {
      font-size: 1.5rem;
    }

    span {
      font-size: 1rem;
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 340px) {
    h3 {
      font-size: 1rem;
    }

    span {
      font-size: 0.8rem;
      margin-bottom: 2rem;
    }
  }
`;

function Login() {
  const { loginAPi, isPending } = useLogin();

  if (isPending) return <SplashScreen />;
  return (
    <StyledLogin>
      <LoginDeskSideOne />

      <StyledLoginDiv2>
        <StyledTextCon>
          <h3>Welcome to quizzy</h3>
          <span>Log in</span>
        </StyledTextCon>
        <LoginForm loginAPi={loginAPi} isPending={isPending} />

        <LoginToSignUp
          pText="Sign in with"
          link="/sign-up"
          textLink="Sign Up"
          questionText="Don't Have An Account?"
        />
      </StyledLoginDiv2>
    </StyledLogin>
  );
}

export default Login;
