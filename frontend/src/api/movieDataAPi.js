import handleApiError from "../utils/handleApiError";
import { addContentTypeHeader } from "../utils/reqHeaders";

// search for movies by title
export async function searchMoviesApi(searchQuery, page = 1) {
  if (!searchQuery) return null;

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/movies/${searchQuery}?page=${page}`,
    { method: "GET" },
  );

  if (!response.ok) {
    handleApiError(response.status);
  }

  const data = await response.json();

  console.log("search data", JSON.stringify(data.data));
  return data.data;
}

// get movie by id
export async function getMovieByIdApi(movieId) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/movies/id/${movieId}`,
    { method: "GET" },
  );

  if (!response.ok) {
    handleApiError(response.status);
  }

  const data = await response.json();
  return data.data;
}

// get movie by title
export async function getMovieByTitleApi(title) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/movies/title/${title}`,
    { method: "GET" },
  );

  if (!response.ok) {
    handleApiError(response.status);
  }

  const data = await response.json();
  return data.data;
}

