import handleApiError from "../utils/handleApiError";
import { addContentTypeHeader } from "../utils/reqHeaders";

// log a user in
export async function sendLoginApi(username, password) {
  const headers = new Headers();
  addContentTypeHeader(headers);

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/users/login`,
    {
      method: "POST",
      credentials: "same-origin",
      headers,
      body: JSON.stringify({ username, password }),
    },
  );

  if (!response.ok) {
    handleApiError(response.status);
  }

  return (await response.json()).data;
}

// log the user out
export async function sendLogoutApi() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/users/logout`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    handleApiError(response.status);
  }

  return;
}

// update the users password
export async function sendUpdatePasswordApi(
  currentPassword,
  newPassword,
  newPasswordConfirm,
) {
  const headers = new Headers();
  addContentTypeHeader(headers);

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/users/updatepassword`,
    {
      method: "PATCH",
      credentials: "same-origin",
      headers,
      body: JSON.stringify({
        currentPassword,
        newPassword,
        newPasswordConfirm,
      }),
    },
  );

  if (!response.ok) {
    handleApiError(response.status);
  }

  const data = await response.json();
  return data.data;
}

// send forgot password request
export async function sendForgotPasswordApi(email) {
  const headers = new Headers();
  addContentTypeHeader(headers);

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/users/forgotpassword`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ email }),
    },
  );

  if (!response.ok) {
    handleApiError(response.status);
  }

  const data = await response.json();
  return data.data;
}

