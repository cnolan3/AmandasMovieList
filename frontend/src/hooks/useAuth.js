import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  sendLoginApi,
  sendLogoutApi,
  sendUpdatePasswordApi,
} from "../api/authApi";

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

// update user password
export function useUpdatePassword() {
  const queryClient = useQueryClient();

  const { mutate: updatePassword, status } = useMutation({
    mutationFn: ({ currentPassword, newPassword, newPasswordConfirm }) =>
      sendUpdatePasswordApi(currentPassword, newPassword, newPasswordConfirm),
    onSuccess: (myInfo) => queryClient.setQueryData(["auth", "myInfo"], myInfo),
    // onError: (err) => toast.error(err.message),
    onError: (err) => console.log(err),
  });

  return { status, updatePassword };
}

