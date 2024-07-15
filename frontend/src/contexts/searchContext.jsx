// debounce functionality modified from https://www.telerik.com/blogs/how-to-create-custom-debounce-hook-react
import { createContext, useContext, useEffect, useRef, useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [input, setInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const debounceTimerRef = useRef();

  useEffect(() => {
    debounceTimerRef.current = setTimeout(() => setDebouncedQuery(input), 300);

    return () => {
      clearTimeout(debounceTimerRef.current);
    };
  }, [input]);

  function setQuery(query) {
    setInput(query);
  }

  return (
    <SearchContext.Provider
      value={{
        query: debouncedQuery,
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

