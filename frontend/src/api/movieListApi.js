// get the watchlist from the backend
export async function getWatchListApi() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/watchlist`,
    { method: "GET" },
  );

  if (!response.ok) {
    throw new Error("Retrieving watchlist failed");
  }

  const data = await response.json();
  return data.data.watchlist;
}

// get the seenlist from the backend
export async function getSeenListApi() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/watchlist/seen`,
    { method: "GET" },
  );

  if (!response.ok) {
    throw new Error("Retrieving seenlist failed");
  }

  const data = await response.json();
  return data.data.seenlist;
}

