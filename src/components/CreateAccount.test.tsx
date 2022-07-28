import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CreateAccount from "./CreateAccount";
import * as API from "../modules/serverRequests";
import {
  createAccountAttemptSuccess,
  createAccountAttemptFailed,
} from "../assets/testdata";
import { USERNAMEMIN, PASSWORDMIN } from "../modules/publicEnvVariables";

afterEach(() => {
  // cleanup on exiting
  jest.clearAllMocks();
});

describe("Create Account page tests", () => {
  it("Renders with login here message", () => {
    act(() => {
      render(
        <BrowserRouter>
          <CreateAccount />
        </BrowserRouter>
      );
    });
    expect(screen.getByText("Login here")).toBeInTheDocument();
  });
  it("Form data can be updated correctly", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <CreateAccount />
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
  it("Form submission: account created", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <CreateAccount />
        </BrowserRouter>
      );
    });
    (API.createAccountAttempt as jest.Mock) = jest.fn();
    (API.createAccountAttempt as jest.Mock).mockResolvedValue(
      createAccountAttemptSuccess
    );
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
    expect(
      screen.getByTestId("createaccount-form-submitButton")
    ).toBeInTheDocument();
    await act(async () => {
      userEvent.click(screen.getByTestId("createaccount-form-submitButton"));
    });
    expect(
      screen.getByTestId("accountCreationSuccessMessage")
    ).toBeInTheDocument();
  });
  it("Form submission: failed account creation - already exists", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <CreateAccount />
        </BrowserRouter>
      );
    });
    (API.createAccountAttempt as jest.Mock) = jest.fn();
    (API.createAccountAttempt as jest.Mock).mockResolvedValue(
      createAccountAttemptFailed
    );
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
    expect(
      screen.getByTestId("createaccount-form-submitButton")
    ).toBeInTheDocument();
    await act(async () => {
      userEvent.click(screen.getByTestId("createaccount-form-submitButton"));
    });
    expect(
      screen.getByTestId("accountCreationFailedMessage")
    ).toBeInTheDocument();
  });

  it("Username and Password field validation in place", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <CreateAccount />
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
