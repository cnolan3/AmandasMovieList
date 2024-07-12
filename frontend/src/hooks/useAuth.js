import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  sendForgotPasswordApi,
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
      toast.success("Successfully logged in");
      return queryClient.setQueryData(["auth", "myInfo"], myInfo);
    },
    onError: (err) => toast.error(err.message),
  });

  return { status, login };
}

// log user out
export function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: logout, status } = useMutation({
    mutationFn: () => sendLogoutApi(),
    onSuccess: () => {
      toast.success("Successfully logged out");
      return queryClient.setQueryData(["auth", "myInfo"], null);
    },
    onError: (err) => toast.error(err.message),
  });

  return { status, logout };
}

// update user password
export function useUpdatePassword() {
  const queryClient = useQueryClient();

  const { mutate: updatePassword, status } = useMutation({
    mutationFn: ({ currentPassword, newPassword, newPasswordConfirm }) =>
      sendUpdatePasswordApi(currentPassword, newPassword, newPasswordConfirm),
    onSuccess: (myInfo) => {
      toast.success("Password updated successfully");
      return queryClient.setQueryData(["auth", "myInfo"], myInfo);
    },
    onError: (err) => toast.error(err.message),
  });

  return { status, updatePassword };
}

// send forgot password request
export function useForgotPassword() {
  const { mutate: forgotPassword, status } = useMutation({
    mutationFn: (email) => sendForgotPasswordApi(email),
    onError: (err) => toast.error(err.message),
  });

  return { status, forgotPassword };
}

