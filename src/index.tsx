import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/entry.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./js/pages/Login";
import Register from "./js/pages/Register";
import Dashboard from "./js/pages/Dashboard";
import { AuthProvider } from "./js/contexts/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
