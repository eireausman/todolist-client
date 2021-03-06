import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import * as API from "../modules/serverRequests";
import Login from "./Login";
import { USERNAMEMIN, PASSWORDMIN } from "../modules/publicEnvVariables";
import { loginAttemptFailed, loginAttemptSuccess } from "../assets/testdata";

afterEach(() => {
  // cleanup on exiting
  jest.clearAllMocks();
});

describe("Login page tests", () => {
  it("Logged out: Login form appears", () => {
    act(() => {
      render(
        <BrowserRouter>
          <Login userIsLoggedIn={false} setuserIsLoggedIn={() => {}} />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("login-box-header")).toBeInTheDocument();
  });
  it("Logged out: Form data can be updated correctly", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Login userIsLoggedIn={false} setuserIsLoggedIn={() => {}} />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("password-input-field")).toBeInTheDocument();
    expect(screen.getByTestId("username-input-field")).toBeInTheDocument();
    userEvent.type(screen.getByTestId("username-input-field"), "12345678");
    userEvent.type(screen.getByTestId("password-input-field"), "12345678");
    expect(
      (screen.getByTestId("username-input-field") as HTMLInputElement).value
    ).toBe("12345678");
    expect(
      (screen.getByTestId("password-input-field") as HTMLInputElement).value
    ).toBe("12345678");
  });
  it("Logged out: Form data can be submitted - Login Fails", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Login userIsLoggedIn={false} setuserIsLoggedIn={() => {}} />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("login-form-submitButton")).toBeInTheDocument();
    userEvent.type(screen.getByTestId("username-input-field"), "12345678");
    userEvent.type(screen.getByTestId("password-input-field"), "12345678");
    expect(
      (screen.getByTestId("username-input-field") as HTMLInputElement).value
    ).toBe("12345678");
    expect(
      (screen.getByTestId("password-input-field") as HTMLInputElement).value
    ).toBe("12345678");
    (API.loginAttempt as jest.Mock) = jest.fn();
    (API.loginAttempt as jest.Mock).mockResolvedValue(loginAttemptFailed);
    await act(async () => {
      userEvent.click(screen.getByTestId("login-form-submitButton"));
    });
    expect(screen.getByTestId("loginFailureMessage")).toBeInTheDocument();
  });
  it("Logged out: Form data can be submitted - Login Success", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Login userIsLoggedIn={false} setuserIsLoggedIn={() => {}} />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("login-form-submitButton")).toBeInTheDocument();
    userEvent.type(screen.getByTestId("username-input-field"), "12345678");
    userEvent.type(screen.getByTestId("password-input-field"), "12345678");
    expect(
      (screen.getByTestId("username-input-field") as HTMLInputElement).value
    ).toBe("12345678");
    expect(
      (screen.getByTestId("password-input-field") as HTMLInputElement).value
    ).toBe("12345678");
    (API.loginAttempt as jest.Mock) = jest.fn();
    (API.loginAttempt as jest.Mock).mockResolvedValue(loginAttemptSuccess);
    await act(async () => {
      userEvent.click(screen.getByTestId("login-form-submitButton"));
    });
    expect(screen.getByTestId("loginSuccessMessage")).toBeInTheDocument();
  });
  it("Username and Password field validation in place", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Login userIsLoggedIn={false} setuserIsLoggedIn={() => {}} />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("username-input-field")).toBeInTheDocument();
    expect(
      (
        screen.getByTestId("username-input-field") as HTMLInputElement
      ).getAttribute("minlength")
    ).toBe(USERNAMEMIN.toString());
    expect(screen.getByTestId("password-input-field")).toBeInTheDocument();
    expect(
      (
        screen.getByTestId("password-input-field") as HTMLInputElement
      ).getAttribute("minlength")
    ).toBe(PASSWORDMIN.toString());
    // a fail save in case env variables get changed in error to something that makes little sense:
    expect(PASSWORDMIN).toBeGreaterThan(7);
    expect(USERNAMEMIN).toBeGreaterThan(1);
  });
});
