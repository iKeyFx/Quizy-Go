import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["user"],

    initialData: () => {
      // Get user data from localStorage
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    },
  });

  // console.log(user._id);
  return { user, isPending, isError };
}
