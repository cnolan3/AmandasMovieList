import handleApiError from "../utils/handleApiError";
import { addContentTypeHeader } from "../utils/reqHeaders";

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
  const headers = new Headers();
  addContentTypeHeader(headers);

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/watchlist/ratemovie/${movieId}`,
    { method: "PATCH", headers, body: JSON.stringify({ rating }) },
  );

  if (!response.ok) {
    handleApiError(response.status);
  }

  const data = await response.json();
  return data.data;
}

// add movie to watchlist
export async function addMovieToListApi(movieId, recommendedByName) {
  const headers = new Headers();
  addContentTypeHeader(headers);

  let body = {};
  if (recommendedByName) body = { recommendedByName };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/watchlist/${movieId}`,
    { method: "POST", headers, body: JSON.stringify(body) },
  );

  if (!response.ok) {
    handleApiError(response.status);
  }

  const data = await response.json();
  return data.data;
}

