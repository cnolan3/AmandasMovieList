import { createContext, useContext } from "react";

import { useSeenList, useWatchList } from "../hooks/useMovieList";

const MovieListContext = createContext();

function MovieListProvider({ children }) {
  const { watchList, status: watchListStatus } = useWatchList();
  const { seenList, status: seenListStatus } = useSeenList();

  return (
    <MovieListContext.Provider
      value={{ watchList, watchListStatus, seenList, seenListStatus }}
    >
      {children}
    </MovieListContext.Provider>
  );
}

function useMovieList() {
  const context = useContext(MovieListContext);

  if (context === undefined)
    throw new Error("SearchContext use outside of SearchProvider");

  return context;
}

export { MovieListProvider, useMovieList };
