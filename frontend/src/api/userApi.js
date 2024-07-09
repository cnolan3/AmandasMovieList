export async function getMyInfoApi() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/users/myinfo`,
    { method: "GET" },
  );

  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new Error("Unauthorized");
      default:
        throw new Error("Retrieving myInfo failed");
    }
  }

  const { username, role, email } = (await response.json()).data;
  return { username, role, email };
}

