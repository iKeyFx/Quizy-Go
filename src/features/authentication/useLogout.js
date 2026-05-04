import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { supabase } from "../../services/supabase";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    queryClient.removeQueries(["user"]);
    navigate("/login", { replace: true });
  };

  return logout;
}

export default useLogout;
