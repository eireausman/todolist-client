import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import NavigationTop from "./NavigationTop";
import { BrowserRouter } from "react-router-dom";

describe("All Product Page Test", () => {
  const [activeMenuTab, setActiveMenuTab] = useState<string>("/todos");
  const [userIsLoggedIn, setuserIsLoggedIn] = useState<boolean>(false);

  it("Naviation container renders", () => {
    act(() => {
      render(
        <BrowserRouter>
          <NavigationTop
            userIsLoggedIn={userIsLoggedIn}
            setuserIsLoggedIn={setuserIsLoggedIn}
          />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("top-nav-container")).toBeInTheDocument();
  });
});
