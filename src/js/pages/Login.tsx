import React from "react";
import LoginForm from "../components/LoginForm";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
}
