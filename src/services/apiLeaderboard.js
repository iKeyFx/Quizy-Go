import { supabase } from "./supabase";

function normalizeRow(row) {
  return {
    id: row.id,
    userId: row.user_id,
    firstName: row.first_name,
    lastName: row.last_name,
    category: row.category,
    difficulty: row.difficulty,
    score: row.score,
    timeTaken: row.time_taken,
    playedAt: row.played_at,
  };
}

export async function submitScore({
  userId,
  firstName,
  lastName,
  category,
  difficulty,
  score,
  timeTaken,
}) {
  const { error } = await supabase.from("leaderboard").insert({
    user_id: userId,
    first_name: firstName,
    last_name: lastName,
    category,
    difficulty,
    score,
    time_taken: timeTaken,
  });

  if (error) throw new Error(error.message);
}

export async function getLeaderboard({ category, difficulty }) {
  let query = supabase
    .from("leaderboard")
    .select("*")
    .order("score", { ascending: false })
    .order("time_taken", { ascending: true });

  if (category) query = query.eq("category", category);
  if (difficulty) query = query.eq("difficulty", difficulty);

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return data.map(normalizeRow);
}

export async function getPersonalBest(userId) {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*")
    .eq("user_id", userId)
    .order("score", { ascending: false })
    .order("time_taken", { ascending: true });

  if (error) throw new Error(error.message);

  return data.map(normalizeRow);
}
