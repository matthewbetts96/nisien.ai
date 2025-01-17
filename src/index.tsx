import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { LanguageProvider } from "./utils/hooks/useLanguage";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
