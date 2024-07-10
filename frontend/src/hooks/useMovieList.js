import { useQuery } from "@tanstack/react-query";

import { getSeenListApi, getWatchListApi } from "../api/movieListApi";

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

