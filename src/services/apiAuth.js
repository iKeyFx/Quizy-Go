import { supabase } from "./supabase";

function normalizeUser(supabaseUser) {
  return {
    _id: supabaseUser.id,
    email: supabaseUser.email,
    firstName: supabaseUser.user_metadata?.firstName ?? "",
    lastName: supabaseUser.user_metadata?.lastName ?? "",
  };
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return { data: { user: normalizeUser(data.user) } };
}

export async function signUp({ email, password, fname, lname }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { firstName: fname, lastName: lname } },
  });
  if (error) throw new Error(error.message);
  return data;
}
