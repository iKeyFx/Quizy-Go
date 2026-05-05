import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitScore as submitScoreApi } from "../../services/apiLeaderboard";
import toast from "react-hot-toast";

function useSubmitScore() {
  const queryClient = useQueryClient();
  const { mutate: submitScore, isPending: isSubmitting } = useMutation({
    mutationFn: submitScoreApi,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] }),
    onError: () =>
      toast.error("Score could not be saved to the leaderboard."),
  });
  return { submitScore, isSubmitting };
}

export default useSubmitScore;
