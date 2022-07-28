import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Logout from "./Logout";
import { BrowserRouter } from "react-router-dom";

afterEach(() => {
  // cleanup on exiting
  jest.clearAllMocks();
});

describe("Logout page tests", () => {
  it("Logout page renders correctly with confirmation message", () => {
    act(() => {
      render(
        <BrowserRouter>
          <Logout userIsLoggedIn={true} setuserIsLoggedIn={() => {}} />
        </BrowserRouter>
      );
    });
    expect(
      screen.getByText("You have now been logged out.")
    ).toBeInTheDocument();
  });
});
