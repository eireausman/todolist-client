import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import ToDoLists from "./ToDoLists";
import * as API from "../modules/serverRequests";
import {
  ToDoListsTestData,
  editToDoModalServerResponse,
  ToDoListsTestDataAfterModalSave,
} from "../assets/testdata";

afterEach(() => {
  // cleanup on exiting
  jest.clearAllMocks();
});

describe("To Do Lists Page", () => {
  it("Logged out: loading spinner is shown", async () => {
    // important: logic to show MustLoginToUse component is at the BrowserRouter level rather than within this component.
    await act(async () => {
      render(
        <ToDoLists userIsLoggedIn={false} setuserIsLoggedIn={function () {}} />
      );
    });
    expect(screen.getByTestId("loading_spinner")).toBeInTheDocument();
  });
  it("Logged in: user's todos are shown'", async () => {
    (API.getToDos as any) = jest.fn();
    (API.getToDos as any).mockResolvedValue(ToDoListsTestData);
    await act(async () => {
      render(
        <ToDoLists userIsLoggedIn={true} setuserIsLoggedIn={function () {}} />
      );
    });
    // checks that a test to do item has been rendered:
    expect(screen.getByTestId("62df604e1acf914ced0e6bec")).toBeInTheDocument();
  });
  it("Logged in: databse request made for user's ToDos'", async () => {
    (API.getToDos as any) = jest.fn();
    (API.getToDos as any).mockResolvedValue(ToDoListsTestData);
    await act(async () => {
      render(
        <ToDoLists userIsLoggedIn={true} setuserIsLoggedIn={function () {}} />
      );
    });
    // confirms the database request has been made once
    expect(API.getToDos).toBeCalled();
    expect(API.getToDos).toBeCalledTimes(1);
  });
  it("Modal: modal opens, closes and accepts focus correctly", async () => {
    (API.getToDos as any) = jest.fn();
    (API.getToDos as any).mockResolvedValue(ToDoListsTestData);
    await act(async () => {
      render(
        <ToDoLists userIsLoggedIn={true} setuserIsLoggedIn={function () {}} />
      );
    });
    expect(screen.getByTestId("62df604e1acf914ced0e6bec")).toBeInTheDocument();
    // click item to show modal:
    userEvent.click(screen.getByTestId("62df604e1acf914ced0e6bec"));
    expect(
      screen.getByTestId("modalitemid-62df604e1acf914ced0e6bec")
    ).toBeInTheDocument();
    // tests that the modal does not close when a modal field accepts focus
    userEvent.click(screen.getByTestId("editModalTitleField"));
    expect(
      screen.getByTestId("modalitemid-62df604e1acf914ced0e6bec")
    ).toBeInTheDocument();
    // closes the modal
    userEvent.click(screen.getByTestId("closeModalClickTrigger"));
  });
  it("Modal: modal saves a data change and updates displayed record", async () => {
    (API.getToDos as jest.Mock) = jest.fn();
    (API.getToDos as jest.Mock).mockResolvedValue(ToDoListsTestData);
    (API.updateEditedToDoItem as jest.Mock) = jest.fn();
    (API.updateEditedToDoItem as jest.Mock).mockResolvedValue(
      editToDoModalServerResponse
    );
    await act(async () => {
      render(
        <ToDoLists userIsLoggedIn={true} setuserIsLoggedIn={function () {}} />
      );
    });
    expect(screen.getByTestId("62df604e1acf914ced0e6bec")).toBeInTheDocument();
    // click item to show modal:
    userEvent.click(screen.getByTestId("62df604e1acf914ced0e6bec"));
    expect(
      screen.getByTestId("modalitemid-62df604e1acf914ced0e6bec")
    ).toBeInTheDocument();
    // add text to the title field
    userEvent.type(screen.getByTestId("editModalTitleField"), " AAA");
    // check the text is reflected in the input field
    expect(
      (screen.getByTestId("editModalTitleField") as HTMLInputElement).value
    ).toBe("asdsad AAA");
    // reset the mock return value to reflect expected changes
    (API.getToDos as jest.Mock).mockResolvedValue(
      ToDoListsTestDataAfterModalSave
    );
    // click the save changes button:
    await act(async () => {
      userEvent.click(screen.getByTestId("editModalSaveChangesButton"));
    });

    expect(screen.getByTestId("62df604e1acf914ced0e6bec").textContent).toBe(
      "asdsad AAA"
    );
  });
});
