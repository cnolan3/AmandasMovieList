import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { sendLoginApi, sendLogoutApi } from "../api/authApi";

// log the user in
export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, status } = useMutation({
    mutationFn: ({ username, password }) => sendLoginApi(username, password),
    onSuccess: (myInfo) => {
      // toast.success("New cabin successfully created");
      return queryClient.setQueryData(["auth", "myInfo"], myInfo);
    },
    // onError: (err) => toast.error(err.message),
    onError: (err) => {
      console.log(err);
    },
  });

  return { status, login };
}

// log user out
export function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: logout, status } = useMutation({
    mutationFn: () => sendLogoutApi(),
    onSuccess: () => {
      // toast.success("New cabin successfully created");
      return queryClient.setQueryData(["auth", "myInfo"], null);
    },
    // onError: (err) => toast.error(err.message),
    onError: (err) => console.log(err),
  });

  return { status, logout };
}

