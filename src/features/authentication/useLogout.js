import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem("user");
    queryClient.removeQueries(["user"]);
    navigate("/login", { replace: true });
  };

  return logout;
}

export default useLogout;
