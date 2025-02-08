import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import styled from "styled-components";
import useLogin from "../features/authentication/useLogin";
import SpinnerMini from "./SpinnerMini";
import SplashScreen from "./SplashScreen";

const StyledForm = styled.form`
  width: 80%;
  margin-top: 1.5rem;

  div {
    margin-bottom: 1rem;

    label {
      font-size: 0.9rem;
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-white);
  border-radius: 4px;
  background-color: var(--color-white);
  color: var(--color-primary);
  font-size: 0.8rem;

  &::placeholder {
    color: var(--color-gray-text);
    opacity: 0.7;
  }

  &:focus {
    outline: 1px solid var(--color-secondary-1);
  }
`;
const StyledFGPassword = styled.span`
  font-size: 12px;
  font-weight: 300;
  margin: 0;
  cursor: pointer;

  &:hover {
    color: var(--color-gray-text);
  }
`;
const StyledPasswordDiv = styled.div`
  margin-bottom: 0 !important;
  position: relative;
`;

const StyledButtun = styled.button`
  width: 105%;
  padding: 0.5rem;
  background-color: var(--color-white);
  color: var(--color-primary);
  border: none;
  border-radius: 4px;
  margin-top: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-gray-text);
  }
`;

const StyledEyeImage = styled.div`
  position: absolute;
  top: 20%;
  right: -2%;
  color: var(--color-primary);
  cursor: pointer;
`;

const StyledErrorSpan = styled.span`
  font-size: 12px;
  color: var(--color-red);
  padding-left: 0.5rem;
`;
function LoginForm({ loginAPi, isPending }) {
  const [visible, setVisible] = useState(false);
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  // testing2@gmail.com
  // Test@123
  const [email] = useState("test@test.com");
  const [password] = useState("@Sodiq22");
  const handleClick = () => {
    setVisible((prev) => !prev);
  };

  const handleLogin = ({ email, password }) => {
    // console.log(email, password);
    loginAPi(
      { email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleLogin)}>
      <div>
        <label>Email Address</label>
        <br />
        <StyledInput
          type="text"
          id="email"
          name="email"
          value={email}
          disabled={isPending}
          {...register("email", {
            required: "This field is required",
          })}
          placeholder="(e.g johnssma@gmail.com)"
        />
        {errors?.email?.message && (
          <StyledErrorSpan>incorrect email or phone</StyledErrorSpan>
        )}
      </div>
      <div>
        <label>Password</label>
        <StyledPasswordDiv>
          <StyledInput
            type={visible ? "text" : "password"}
            id="password"
            value={password}
            disabled={isPending}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
            placeholder="Password"
          />
          <StyledEyeImage onClick={handleClick}>
            {visible ? <FaRegEye /> : <FaRegEyeSlash />}
          </StyledEyeImage>
          {errors?.password?.message && (
            <StyledErrorSpan>incorrect email or phone</StyledErrorSpan>
          )}
        </StyledPasswordDiv>
        <StyledFGPassword>Forget password?</StyledFGPassword>
      </div>
      <StyledButtun>{isPending ? <SpinnerMini /> : "Log in"}</StyledButtun>
    </StyledForm>
  );
}

export default LoginForm;
