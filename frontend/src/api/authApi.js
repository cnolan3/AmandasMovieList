import { addContentTypeHeader } from "../utils/reqHeaders";

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
    switch (response.status) {
      case 401:
        throw new Error("Login failed, unauthorized");
      default:
        throw new Error("Login request failed");
    }
  }

  return (await response.json()).data;
}

