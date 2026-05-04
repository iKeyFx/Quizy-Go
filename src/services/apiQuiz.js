import { supabase } from "./supabase";

export async function getQuestions({ category, difficulty }) {
  const { data, error } = await supabase
    .from("quiz_questions")
    .select("id, category, difficulty, question, options, correct_option")
    .eq("category", category)
    .eq("difficulty", difficulty);

  if (error) throw new Error(error.message);

  return data.map((q) => ({ ...q, correctOption: q.correct_option }));
}
