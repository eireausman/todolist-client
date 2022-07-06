import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import NewToDo from "./NewToDo";

describe("Empty form renders correctly", () => {
  it("Naviation container renders", () => {
    act(() => {
      render(<NewToDo />);
    });
    expect(screen.getByTitle("title")).toBeInTheDocument();
    expect(screen.getByTitle("detail")).toBeInTheDocument();
    expect(screen.getByTitle("addDueDate")).toBeInTheDocument();
  });
  it("Add Due Date button click shows dueDate field", () => {
    act(() => {
      render(<NewToDo />);
    });
    expect(screen.getByTitle("addDueDate")).toBeInTheDocument();
    userEvent.click(screen.getByTitle("addDueDate")); // Increment 1
    expect(screen.getByTitle("dueDate")).toBeInTheDocument();
  });
});
