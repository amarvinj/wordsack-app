import React from "react";
import { Routes, Route } from "react-router-dom";
// import Link from "./components/Link";
// import Route from "./components/Route";
import "./App.css";
import Translate from "./components/Translate";
import HireExperts from "./components/hire-experts";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Translate />} />
        <Route path="/hire-experts" element={<HireExperts />} />
      </Routes>
    </div>
  );
}

export default App;
