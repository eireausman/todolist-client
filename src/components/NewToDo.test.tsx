import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import NewToDo from "./NewToDo";
import * as API from "../modules/serverRequests";
import {
  newToDoServerResponseSuccess,
  newToDoServerResponseFailed,
} from "../assets/testdata";

afterEach(() => {
  // cleanup on exiting
  jest.clearAllMocks();
});

describe("Empty form renders correctly", () => {
  it("Naviation container renders", () => {
    act(() => {
      render(<NewToDo />);
    });
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("detail")).toBeInTheDocument();
    expect(screen.getByTestId("addDueDate")).toBeInTheDocument();
  });
  it("Check due date field appears on demand", () => {
    act(() => {
      render(<NewToDo />);
    });
    expect(screen.getByTestId("addDueDate")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("addDueDate"));
    expect(screen.getByTestId("dueDate")).toBeInTheDocument();
  });
  it("Check form validation is in place", () => {
    act(() => {
      render(<NewToDo />);
    });
    expect(screen.getByTestId("title").getAttribute("minLength")).toBe("3");
  });
  it("Form inputs render as expected", () => {
    act(() => {
      render(<NewToDo />);
    });
    userEvent.type(screen.getByTestId("title"), "This is a title");
    userEvent.type(screen.getByTestId("detail"), "detail has been added");
    userEvent.click(screen.getByTestId("addDueDate"));

    expect(screen.getByTestId("dueDate")).toBeInTheDocument();
    userEvent.type(screen.getByTestId("dueDate"), "2010-10-10");
    expect((screen.getByTestId("title") as HTMLInputElement).value).toBe(
      "This is a title"
    );
    expect((screen.getByTestId("detail") as HTMLInputElement).value).toBe(
      "detail has been added"
    );
    expect((screen.getByTestId("dueDate") as HTMLInputElement).value).toBe(
      "2010-10-10"
    );
  });
  it("Form saves correctly as expected", async () => {
    await act(async () => {
      render(<NewToDo />);
    });
    userEvent.type(screen.getByTestId("title"), "This is a title");
    userEvent.type(screen.getByTestId("detail"), "detail has been added");
    userEvent.click(screen.getByTestId("addDueDate"));

    expect(screen.getByTestId("dueDate")).toBeInTheDocument();
    userEvent.type(screen.getByTestId("dueDate"), "2010-10-10");
    expect((screen.getByTestId("title") as HTMLInputElement).value).toBe(
      "This is a title"
    );
    expect((screen.getByTestId("detail") as HTMLInputElement).value).toBe(
      "detail has been added"
    );
    expect((screen.getByTestId("dueDate") as HTMLInputElement).value).toBe(
      "2010-10-10"
    );
    (API.postNewToDoItem as any) = jest.fn();
    (API.postNewToDoItem as any).mockResolvedValue(
      newToDoServerResponseSuccess
    );
    await act(async () => {
      userEvent.click(screen.getByTestId("submitNewToDoButton"));
    });
    expect(screen.getByTestId("alert-success")).toBeInTheDocument();
    (API.postNewToDoItem as any).mockResolvedValue(newToDoServerResponseFailed);
    await act(async () => {
      userEvent.click(screen.getByTestId("submitNewToDoButton"));
    });
    expect(screen.getByTestId("alert-failure")).toBeInTheDocument();
  });

  // // add text to the title field
});
