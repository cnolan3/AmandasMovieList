import { createContext, useContext, useEffect, useReducer } from "react";

const MovieListContext = createContext();

const initialState = {
  watchList: [],
  seenList: [],
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "watchList/loaded":
      return { ...state, isLoading: false, watchList: action.payload };
    case "seenList/loaded":
      return { ...state, isLoading: false, seenList: action.payload };
    case "watchList/remove":
      return {
        ...state,
        isLoading: false,
        watchList: state.watchList.filter(
          (movie) => movie.imdbID !== action.payload,
        ),
      };
    case "seenList/remove":
      return {
        ...state,
        isLoading: false,
        seenList: state.seenList.filter(
          (movie) => movie.imdbID !== action.payload,
        ),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}
