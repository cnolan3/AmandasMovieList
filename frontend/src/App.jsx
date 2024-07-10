import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRef } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  useLocation,
  useOutlet,
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import "./App.css";
import MovieListSection from "./components/MovieListSection/MovieListSection";
import { SearchProvider } from "./contexts/searchContext.jsx";
import { UserProvider } from "./contexts/userContext.jsx";
import AccountPage from "./pages/AccountPage/AccountPage";
import Homepage from "./pages/Homepage/Homepage";
import LoginPage from "./pages/LoginPage/LoginPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: (count, { message: error }) => error !== "Unauthorized",
    },
  },
});

const routes = [
  {
    name: "Home",
    element: <Homepage />,
    nodeRef: createRef(),
    class: "home",
    timeout: 0,
    children: [
      { path: "/", element: <MovieListSection />, nodeRef: createRef() },
    ],
  },
  {
    path: "/login",
    name: "Login",
    element: <LoginPage />,
    nodeRef: createRef(),
    class: "login",
    timeout: 200,
  },
  {
    path: "/account",
    name: "Account",
    element: <AccountPage />,
    nodeRef: createRef(),
    class: "account",
    timeout: 200,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    children: routes.map((route) => ({
      path: route.path,
      element: route.element,
      children: route.children,
    })),
  },
]);

function Base() {
  const location = useLocation();
  const outlet = useOutlet();
  const route =
    routes.find(
      (route) =>
        (route.path && route.path === location.pathname) ||
        (route.children &&
          (route.children.find((child) => child.path === location.pathname) ??
            false)),
    ) ?? {};
  return (
    <div className="container">
      <SwitchTransition mode="in-out">
        <CSSTransition
          key={location.pathname}
          nodeRef={route.nodeRef}
          timeout={route.timeout}
          classNames={route.class}
        >
          <div ref={route.nodeRef} className={route.class}>
            {outlet}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      <SearchProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </SearchProvider>
    </QueryClientProvider>
  );
}

export default App;
