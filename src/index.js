import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NavigationProvider } from "./context/navigation";
import { TranslationProvider } from "./context/Translation";
import { HireExpertsProvider } from "./context/HireExperts";

const baseUrl = "/wordsack-app";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <TranslationProvider>
    <HireExpertsProvider>
      <NavigationProvider baseUrl={baseUrl}>
        <App />
      </NavigationProvider>
    </HireExpertsProvider>
  </TranslationProvider>
);
