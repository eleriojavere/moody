import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import Header from "../components/Header";

export default function Dashboard() {
  if (!auth.currentUser) {
    return <Navigate to="/register" />;
  }

  return (
    <div className="dashboard">
      <Header />
    </div>
  );
}
