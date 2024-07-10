import handleApiError from "../utils/handleApiError";

// get the watchlist from the backend
export async function getWatchListApi() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/watchlist`,
    { method: "GET" },
  );

  if (!response.ok) {
    handleApiError(response.status);
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
    handleApiError(response.status);
  }

  const data = await response.json();
  return data.data.seenlist;
}

// delete movie from all lists
export async function deleteMovieApi(movieId) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/watchlist/${movieId}`,
    { method: "DELETE" },
  );

  if (!response.ok) {
    handleApiError(response.status);
  }

  const data = await response.json();
  return data.data;
}

// rate movie and move it to seen list
export async function rateMovieApi(movieId, rating) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/watchlist/ratemovie/${movieId}`,
    { method: "PATCH", body: JSON.stringify({ rating }) },
  );

  if (!response.ok) {
    handleApiError(response.status);
  }

  const data = await response.json();
  return data.data;
}

