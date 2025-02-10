import LoginDeskSideOne from "../../ui/LoginDeskSideOne";
import LoginForm from "../../ui/LoginForm";
import LoginToSignUp from "../../ui/LoginToSignUp";
import SignUpForm from "./SignUpForm";
import {
  ArrowBack,
  StyledArrowBack,
  StyledLogin,
  StyledLoginDiv2,
  StyledTextCon,
} from "./Login";
import useSignup from "./useSignup";
import { useMoveBack } from "../../hooks/useMoveBack";

function SignUp() {
  const { userSignUp, isError, isPending } = useSignup();
  const moveBack = useMoveBack();
  return (
    <StyledLogin>
      <LoginDeskSideOne />

      <StyledLoginDiv2>
        <StyledArrowBack onClick={moveBack}>
          <ArrowBack />
        </StyledArrowBack>
        <StyledTextCon>
          <h3>Welcome to quizzy</h3>
          <span>Create an Account</span>
        </StyledTextCon>
        <SignUpForm
          userSignUp={userSignUp}
          isError={isError}
          isPending={isPending}
        />

        <LoginToSignUp
          pText="create an account with"
          link="/login"
          textLink="Log In"
          questionText="Don't Have An Account?"
        />
      </StyledLoginDiv2>
    </StyledLogin>
  );
}

export default SignUp;
