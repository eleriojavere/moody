import React, { useState } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterForm() {
  const { signup } = useAuth();
  const [error, setError] = useState("");

  const validateUser = async (values: { email: string; password: string }) => {
    try {
      setError("");
      await signup(values.email, values.password);
    } catch (e) {
      console.error("Something went wrong", e);
      setError("Failed to register, please try again");
    }
  };

  return (
    <div className="register-form">
      <h1>Moody</h1>
      <h2>Take control of your waves of emotions</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: { email?: string; password?: string } = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values) => {
          validateUser(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />

            <div className="error">
              {errors.email && touched.email && errors.email}
            </div>

            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <div className="error">
              {errors.password && touched.password && errors.password}
            </div>
            <div className="error">{error}</div>

            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
            <div className="login-link">
              Already have an account? <Link to="/login"> Log in</Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
