import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addMovieToListApi,
  deleteMovieApi,
  getSeenListApi,
  getWatchListApi,
  rateMovieApi,
} from "../api/movieListApi";

// watchlist query
export function useWatchList() {
  const {
    data: watchList,
    error,
    status,
  } = useQuery({
    queryKey: ["movielist", "watchlist"],
    queryFn: getWatchListApi,
  });

  return { watchList, error, status };
}

// seenlist query
export function useSeenList() {
  const {
    data: seenList,
    error,
    status,
  } = useQuery({
    queryKey: ["movielist", "seenlist"],
    queryFn: getSeenListApi,
  });

  return { seenList, error, status };
}

// remove movie from all lists
export function useDeleteMovie() {
  const queryClient = useQueryClient();

  const { mutate: deleteMovie, status } = useMutation({
    mutationFn: (movieId) => deleteMovieApi(movieId),
    onSuccess: () => {
      // toast.success("New cabin successfully created");
      return queryClient.invalidateQueries({ queryKey: ["movielist"] });
    },
    // onError: (err) => toast.error(err.message),
    onError: (err) => console.log(err),
  });

  return { status, deleteMovie };
}

// rate a movie and move it to seen list
export function useRateMovie() {
  const queryClient = useQueryClient();

  const { mutate: rateMovie, status } = useMutation({
    mutationFn: ({ movieId, rating }) => rateMovieApi(movieId, rating),
    onSuccess: () => {
      // toast.success("New cabin successfully created");
      return queryClient.invalidateQueries({ queryKey: ["movielist"] });
    },
    // onError: (err) => toast.error(err.message),
    onError: (err) => console.log(err),
  });

  return { status, rateMovie };
}

// add movie to watchlist
export function useAddMovie() {
  const queryClient = useQueryClient();

  const { mutate: addMovie, status } = useMutation({
    mutationFn: ({ movieId, recommendedByName }) =>
      addMovieToListApi(movieId, recommendedByName),
    onSuccess: () => {
      // toast.success("New cabin successfully created");
      return queryClient.invalidateQueries({ queryKey: ["movielist"] });
    },
    // onError: (err) => toast.error(err.message),
    onError: (err) => console.log(err),
  });

  return { status, addMovie };
}
