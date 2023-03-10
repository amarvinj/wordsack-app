import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { TranslationProvider } from "./context/Translation";
import { HireExpertsProvider } from "./context/HireExperts";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

// {process.env.PUBLIC_URL} added

root.render(
  <TranslationProvider>
    <HireExpertsProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </HireExpertsProvider>
  </TranslationProvider>
);
