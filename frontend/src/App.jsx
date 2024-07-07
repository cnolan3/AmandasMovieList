import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HeaderSection from "./components/HeaderSection/HeaderSection";
import MovieListSection from "./components/MovieListSection/MovieListSection";
import AppPage from "./pages/AppPage/AppPage";
import Homepage from "./pages/Homepage/Homepage";
import LoginPage from "./pages/LoginPage/LoginPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <Homepage />,

    children: [
      {
        path: "/",
        element: <MovieListSection />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
