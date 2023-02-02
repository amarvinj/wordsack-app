import React from "react";
import { Routes, Route, Link, useLocation, Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// import Link from "./components/Link";
// import Route from "./components/Route";
import "./App.css";
import Translate from "./components/Translate";
import Maximized from "./components/Maximized";
import HireExperts from "./components/hire-experts";
import UnsupportedLanguage from "./components/UnsupportedLanguage";
import PrivacyPolicy from "./components/Policies/PrivacyPolicy";
import TermsAndConditions from "./components/Policies/TermsAndConditions";
import RefundPolicy from "./components/Policies/RefundPolicy";
import { ReactComponent as Logo } from "./wordsack.svg";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route path="/" element={<Translate />} />
          <Route path="/maximized" element={<Maximized />} />
          <Route path="/hire-experts" element={<HireExperts />} />
          <Route
            path="/unsupported-language"
            element={<UnsupportedLanguage />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-&-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Routes>
      </AnimatePresence>

      <Link to={"/"}>
        <Logo className="logo" />
      </Link>
    </div>
  );
}

export default App;
