import handleApiError from "../utils/handleApiError";

export async function getMyInfoApi() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/users/myinfo`,
    { method: "GET" },
  );

  if (!response.ok) {
    handleApiError(response.status);
  }

  const { username, role, email } = (await response.json()).data;
  return { username, role, email };
}
