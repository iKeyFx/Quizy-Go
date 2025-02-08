import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import styled from "styled-components";
import useSignup from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

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
function SignUpForm({ userSignUp, isError, isPending }) {
  const [visible, setVisible] = useState(false);
  const { register, formState, handleSubmit, reset, getValues } = useForm();
  const { errors } = formState;

  const handleClick = () => {
    setVisible((prev) => !prev);
  };

  const handleSignUp = ({ email, password, fname, lname, confirmPassword }) => {
    console.log(email, password, fname, lname, confirmPassword);
    userSignUp({ email, password, fname, lname, confirmPassword });
    // reset();
  };
  return (
    <StyledForm onSubmit={handleSubmit(handleSignUp)}>
      <div>
        <label>First Name</label>
        <br />
        <StyledInput
          type="text"
          id="fname"
          disabled={isPending}
          {...register("fname", {
            required: "This field is required",
          })}
          placeholder="Austin"
        />
        {errors?.fname?.message && (
          <StyledErrorSpan>{errors?.fname?.message}</StyledErrorSpan>
        )}
      </div>
      <div>
        <label>Last Name</label>
        <br />
        <StyledInput
          type="text"
          id="lname"
          disabled={isPending}
          {...register("lname", {
            required: "This field is required",
          })}
          placeholder="Post"
        />
        {errors?.lname?.message && (
          <StyledErrorSpan>{errors?.lname?.message}</StyledErrorSpan>
        )}
      </div>
      <div>
        <label>Email Adddress</label>
        <br />
        <StyledInput
          type="text"
          id="email"
          disabled={isPending}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          placeholder="(e.g postmalone@gmail.com)"
        />
        {errors?.email?.message && (
          <StyledErrorSpan>{errors?.email?.message}</StyledErrorSpan>
        )}
      </div>

      <div>
        <label>Password</label>
        <StyledPasswordDiv>
          <StyledInput
            type={visible ? "text" : "password"}
            id="password"
            disabled={isPending}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
              },
            })}
            placeholder="Password"
          />
          <StyledEyeImage onClick={handleClick}>
            {visible ? <FaRegEye /> : <FaRegEyeSlash />}
          </StyledEyeImage>
          {errors?.password?.message && (
            <StyledErrorSpan>{errors?.password?.message}</StyledErrorSpan>
          )}
        </StyledPasswordDiv>
      </div>
      <div>
        <label>Confirm Password</label>
        <StyledPasswordDiv>
          <StyledInput
            type={visible ? "text" : "password"}
            id="confirmPassword"
            disabled={isPending}
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords needs to match",
            })}
            placeholder="Confirm Password"
          />
          <StyledEyeImage onClick={handleClick}>
            {visible ? <FaRegEye /> : <FaRegEyeSlash />}
          </StyledEyeImage>
          {errors?.confirmPassword?.message && (
            <StyledErrorSpan>
              {errors?.confirmPassword?.message}
            </StyledErrorSpan>
          )}
        </StyledPasswordDiv>
      </div>
      <StyledButtun>{isPending ? <SpinnerMini /> : "Sign Up"}</StyledButtun>
    </StyledForm>
  );
}

export default SignUpForm;
