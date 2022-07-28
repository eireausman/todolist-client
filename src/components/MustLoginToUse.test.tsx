import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import MustLoginToUse from "./MustLoginToUse";

afterEach(() => {
  // cleanup on exiting
  jest.clearAllMocks();
});

describe("Must Login Message Card", () => {
  it("Card renders correctly, with login and createaccount links", () => {
    act(() => {
      render(<MustLoginToUse />);
    });
    expect(screen.getByTestId("must_be_logged_in")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Create Account")).toBeInTheDocument();
  });
});
