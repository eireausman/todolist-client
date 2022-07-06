import React from "react";
import { Link } from "react-router-dom";

const NavigationTop = () => {
  return (
    <div data-testid="top-nav-container">
      <Link to="/todos">To Dos</Link>
      ||
      <Link to="/todos/new-todo-item">New To Do</Link>
      ||
      <Link to="/login">Login</Link>
    </div>
  );
};

export default NavigationTop;
