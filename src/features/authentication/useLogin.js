import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginAPi, isPending } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data.user);
      navigate("/dashboard", { replace: true });
      // console.log(data);
    },

    onError: (error) => {
      console.log(error);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { loginAPi, isPending };
}

export default useLogin;
