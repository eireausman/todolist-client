import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import NavigationTop from "./NavigationTop";
import { BrowserRouter } from "react-router-dom";

describe("All Product Page Test", () => {
  it("Naviation container renders", () => {
    act(() => {
      render(
        <BrowserRouter>
          <NavigationTop />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("top-nav-container")).toBeInTheDocument();
  });
});
