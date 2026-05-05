import { useQuery } from "@tanstack/react-query";
import { getLeaderboard } from "../../services/apiLeaderboard";

function useLeaderboard({ category, difficulty }) {
  return useQuery({
    queryKey: ["leaderboard", category || "all", difficulty || "all"],
    queryFn: () => getLeaderboard({ category, difficulty }),
    staleTime: 60_000,
  });
}

export default useLeaderboard;
