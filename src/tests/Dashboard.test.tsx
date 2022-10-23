import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../js/pages/Dashboard";
import { AuthContext, User } from "../js/contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

jest.mock("../firebase.js", () => {
  return {
    auth: {},
  };
});

export function renderComponentWithAuthProvider(user: User) {
  return render(
    <AuthContext.Provider
      value={{
        currentUser: user,
        logIn: () => {},
        signOut: () => {},
        error: null,
        signup: () => {},
      }}
    >
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

describe("Dashboard page", () => {
  it("should display welcoming text for logged in user", () => {
    const user = { email: "test@test.ee" };
    renderComponentWithAuthProvider(user);

    const linkElement = screen.getByText(`Hi,${user.email}`);
    expect(linkElement).toBeInTheDocument();
  });

  it("should navigate user to register page when no logged in user", () => {
    renderComponentWithAuthProvider(null);

    const linkElement = screen.getByText("Register");
    expect(linkElement).toBeInTheDocument();
  });
});
