import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./i18n";
import LanguageSwitcher from "./components/LanguageSwitcher.jsx";
import "./i18n";
import App from "./App.jsx";
import BrainrotLeaguePage from "./BrainrotLeaguePage.jsx";
import KolosClickerPage from "./KolosClickerPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <LanguageSwitcher />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/brainrot-league" element={<BrainrotLeaguePage />} />
        <Route path="/kolos-clicker" element={<KolosClickerPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
