import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["user"],

    initialData: () => {
      try {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
      } catch {
        localStorage.removeItem("user");
        return null;
      }
    },
  });

  // console.log(user._id);
  return { user, isPending, isError };
}
