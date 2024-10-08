import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  getMovieByIdApi,
  getMovieByTitleApi,
  searchMoviesApi,
} from "../api/movieDataAPi";

// search movies
export function useSearchMovies(searchQuery) {
  const { data, error, status } = useQuery({
    queryKey: ["moviedata", "search", searchQuery],
    queryFn: () => searchMoviesApi(searchQuery),
  });

  const movies = data && data.Search ? data.Search : [];
  const numResults = data && data.numResults ? data.numResults : 0;

  return { movies, numResults, error, status };
}

// get a movie by imdbid
export function useGetMovieById(movieId) {
  const {
    data: movie,
    error,
    status,
  } = useQuery({
    queryKey: ["moviedata", "id", movieId],
    queryFn: () => getMovieByIdApi(movieId),
  });

  return { movie, error, status };
}

// get a movie by imdbid
export function useGetMovieByTitle(movieTitle) {
  const {
    data: movie,
    error,
    status,
  } = useQuery({
    queryKey: ["moviedata", "title", movieTitle],
    queryFn: () => getMovieByTitleApi(movieTitle),
  });

  return { movie, error, status };
}
