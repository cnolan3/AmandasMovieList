import { createContext, useContext, useReducer } from "react";

const SearchContext = createContext();

const initialState = {
  query: "",
  placeholder: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "search":
      return { ...state, query: action.payload };
    case "placeholder":
      return { ...state, placeholder: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function SearchProvider({ children }) {
  const [{ query, placeholder }, dispatch] = useReducer(reducer, initialState);

  function setQuery(queryStr) {
    dispatch({ type: "search", payload: queryStr });
  }

  function setPlaceholder(placeholder) {
    dispatch({ type: "placeholder", payload: placeholder });
  }

  return (
    <SearchContext.Provider
      value={{
        query,
        placeholder,
        setQuery,
        setPlaceholder,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

function useSearch() {
  const context = useContext(SearchContext);

  if (context === undefined)
    throw new Error("SearchContext use outside of SearchProvider");

  return context;
}

export { SearchProvider, useSearch };

