import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider.jsx";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/shared.css";
import FinanceProvider from "./contexts/FinanceProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <FinanceProvider>
          <App />
        </FinanceProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);