import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function useSignup() {
  const navigate = useNavigate();
  const {
    mutate: userSignUp,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ email, password, fname, lname, confirmPassword }) =>
      signUp({ email, password, fname, lname, confirmPassword }),

    onSuccess: (data) => {
      navigate("/login", { replace: true });
      toast.success("Account Successfully Created, Log in Now!");
    },

    onError: (error) => {
      if (/already|registered|in use/i.test(error.message)) return
      toast.error(error.message)
    },
  });

  return { userSignUp, isError, isPending };
}

export default useSignup;
