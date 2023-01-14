import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { TranslationProvider } from "./context/Translation";
import { HireExpertsProvider } from "./context/HireExperts";

const baseUrl = "/wordsack-app";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <TranslationProvider>
    <HireExpertsProvider>
      <BrowserRouter baseUrl={baseUrl}>
        <App />
      </BrowserRouter>
    </HireExpertsProvider>
  </TranslationProvider>
);
