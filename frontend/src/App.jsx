import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppPage from "./pages/AppPage/AppPage";
import Homepage from "./pages/Homepage/Homepage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="app" element={<AppPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
