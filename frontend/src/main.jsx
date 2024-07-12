import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

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
      <Toaster
        position="bottom-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fdfdff",
            color: "#040610",
          },
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>,
);
