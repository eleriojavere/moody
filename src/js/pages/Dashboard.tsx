import React from "react";

import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import Register from "../pages/Register";

export default function Dashboard() {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Register />;
  }

  return (
    <div className="dashboard">
      <Header />
    </div>
  );
}
