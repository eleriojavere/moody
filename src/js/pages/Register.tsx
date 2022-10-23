import React from "react";
import { Navigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="register-page">
      <RegisterForm />
    </div>
  );
}
