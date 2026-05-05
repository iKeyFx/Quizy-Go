import { useQuery } from "@tanstack/react-query";
import { getPersonalBest } from "../../services/apiLeaderboard";

function usePersonalBest(userId) {
  return useQuery({
    queryKey: ["leaderboard", "personal", userId],
    queryFn: () => getPersonalBest(userId),
    staleTime: 60_000,
    enabled: !!userId,
  });
}

export default usePersonalBest;
