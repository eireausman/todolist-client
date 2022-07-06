import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationTop from "./components/NavigationTop";
import ToDoLists from "./components/ToDoLists";
import NewToDo from "./components/NewToDo";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <NavigationTop />
        <Routes>
          <Route path="/todos" element={<ToDoLists />} />
          <Route path="/todos/new-todo-item" element={<NewToDo />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
