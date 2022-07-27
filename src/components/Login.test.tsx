import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import MustLoginToUse from "./MustLoginToUse";

describe("Navigation Top Bar Tests", () => {
  it("Logged in: Logout shows when user is logged in", () => {
    act(() => {
      render(
        <BrowserRouter>
          <MustLoginToUse />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("must_be_logged_in")).toBeInTheDocument();
    expect(screen.getByText("Please Login")).toBeInTheDocument();
    expect(screen.getByText("Create Account")).toBeInTheDocument();
  });
});
