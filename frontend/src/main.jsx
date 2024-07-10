import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { MovieListProvider } from "./contexts/MovieListContext.jsx";
import { SearchProvider } from "./contexts/searchContext.jsx";
import { UserProvider } from "./contexts/userContext.jsx";
import "./index.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: (count, { message: error }) => error !== "Unauthorized",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      <SearchProvider>
        <UserProvider>
          <MovieListProvider>
            <App />
          </MovieListProvider>
        </UserProvider>
      </SearchProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
