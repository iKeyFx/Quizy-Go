import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { supabase } from "../../services/supabase";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out failed:", error.message);
      return;
    }
    localStorage.removeItem("user");
    queryClient.removeQueries({ queryKey: ["user"] });
    navigate("/login", { replace: true });
  };

  return logout;
}

export default useLogout;
