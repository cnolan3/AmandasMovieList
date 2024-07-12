import { createRef } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  matchPath,
  useLocation,
  useOutlet,
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import "./App.css";
import MovieListSection from "./components/Sections/MovieListSection/MovieListSection";
import AccountPage from "./pages/AccountPage/AccountPage";
import Homepage from "./pages/Homepage/Homepage";
import LoginForgotPage from "./pages/LoginForgotPage/LoginForgotPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";

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
    name: "Login/Reset",
    element: <LoginForgotPage />,
    nodeRef: createRef(),
    class: "login-reset",
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
  {
    path: "/resetpassword/:resetToken",
    name: "ResetPassword",
    element: <ResetPasswordPage />,
    nodeRef: createRef(),
    class: "login-reset",
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
  console.log(routes, typeof location.pathname);
  const route =
    routes.find(
      (route) =>
        (route.path && matchPath({ path: route.path }, location.pathname)) ||
        (route.children &&
          (route.children.find((child) =>
            matchPath({ path: child.path }, location.pathname),
          ) ??
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
  return <RouterProvider router={router} />;
}

export default App;

