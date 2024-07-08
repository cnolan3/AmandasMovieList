import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { SearchProvider } from "./contexts/searchContext.jsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </React.StrictMode>,
);
