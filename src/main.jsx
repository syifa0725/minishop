import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./App.css";

import { KeranjangProvider } from "./Context/KeranjangContext";
import { AuthProvider } from "./Context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <KeranjangProvider>
        <App />
      </KeranjangProvider>
    </AuthProvider>
  </StrictMode>
);