import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/entry.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./js/pages/Login";
import Dashboard from "./js/pages/Dashboard";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
