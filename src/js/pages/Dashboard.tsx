import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

export default function Dashboard() {
  if (!auth.currentUser) {
    return <Navigate to="/register" />;
  }

  return <div className="dashboard">Dashboard</div>;
}
