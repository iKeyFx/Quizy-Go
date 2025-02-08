import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["user"],
  });

  // console.log(user);
  return { user, isPending, isError };
}
