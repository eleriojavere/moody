import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../js/pages/Dashboard";

jest.mock("firebase/compat/app", () => {
  return {
    initializeApp: jest.fn(),
    auth: jest.fn().mockReturnValueOnce({
      currentUser: { email: "example@gmail.com" },
    }),
  };
});

describe("Dashboard page", () => {
  it("should display welcoming text for logged in user", () => {
    render(<Dashboard />);

    const linkElement = screen.getByText(/Hi, test@test.com/i);
    expect(linkElement).toBeInTheDocument();
  });
});
