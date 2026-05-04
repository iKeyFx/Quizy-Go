import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../../services/apiQuiz";

export function useQuizQuestions({ category, difficulty }) {
  return useQuery({
    queryKey: ["quiz_questions", category, difficulty],
    queryFn: () => getQuestions({ category, difficulty }),
    staleTime: Infinity,
  });
}
