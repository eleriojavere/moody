import React from "react";
import { Formik } from "formik";
import axios from "axios";

export default function LoginForm() {
  const validateUser = (values: { email: string; password: string }) => {
    axios
      .post("http://localhost:2022/login", values, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="login-form">
      <h1>Moody</h1>
      <h2>Take control of your waves of emotions</h2>
      <Formik
        initialValues={{ email: "test@test.ee", password: "testtest" }}
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
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Log in
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
