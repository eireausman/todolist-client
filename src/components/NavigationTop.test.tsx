import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import NavigationTop from "./NavigationTop";

describe("Navigation Top Bar Tests", () => {
  it("Logged in: Logout shows when user is logged in", () => {
    act(() => {
      render(
        <BrowserRouter>
          <NavigationTop
            userIsLoggedIn={true}
            setuserIsLoggedIn={function () {}}
          />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("logout_button")).toBeInTheDocument();
  });
  it("Logged out: Login and Create Account buttons show", () => {
    act(() => {
      render(
        <BrowserRouter>
          <NavigationTop
            userIsLoggedIn={false}
            setuserIsLoggedIn={function () {}}
          />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("createaccount_button")).toBeInTheDocument();
    expect(screen.getByTestId("login_button")).toBeInTheDocument();
  });
  it("Active Tab functionality works as intended", () => {
    act(() => {
      render(
        <BrowserRouter>
          <NavigationTop
            userIsLoggedIn={false}
            setuserIsLoggedIn={function () {}}
          />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("link-todos")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("link-todos"));
  });
});
