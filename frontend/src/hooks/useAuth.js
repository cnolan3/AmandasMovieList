import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sendLoginApi } from "../api/authApi";

// watchlist query
export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ username, password }) => sendLoginApi(username, password),
    onSuccess: (myInfo) => {
      // toast.success("New cabin successfully created");
      queryClient.setQueryData(["myInfo"], myInfo);
    },
    // onError: (err) => toast.error(err.message),
    onError: (err) => console.log(err),
  });

  return { isLoading, login };
}

