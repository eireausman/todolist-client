import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavigationTop from "./components/NavigationTop";
import ToDoLists from "./components/ToDoLists";
import NewToDo from "./components/NewToDo";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <NavigationTop />
        <Routes>
          <Route path="/todos" element={<ToDoLists />} />
          <Route path="/todos/new-todo-item" element={<NewToDo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
