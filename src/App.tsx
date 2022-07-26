import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./cssReset.css";
import NavigationTop from "./components/NavigationTop";
import ToDoLists from "./components/ToDoLists";
import NewToDo from "./components/NewToDo";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Logout from "./components/Logout";
import MustLoginToUse from "./components/MustLoginToUse";

import { userLoginCheck } from "./modules/serverRequests";

const App: React.FC = () => {
  const [userIsLoggedIn, setuserIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    userLoginCheck().then((serverResponse) => {
      if (serverResponse.userLoggedIn === true) {
        setuserIsLoggedIn(true);
      } else {
        setuserIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <NavigationTop
          userIsLoggedIn={userIsLoggedIn}
          setuserIsLoggedIn={setuserIsLoggedIn}
        />
        <Routes>
          {userIsLoggedIn === true ? (
            <Route
              path="/todos"
              element={
                <ToDoLists
                  userIsLoggedIn={userIsLoggedIn}
                  setuserIsLoggedIn={setuserIsLoggedIn}
                />
              }
            />
          ) : (
            <Route path="/todos" element={<MustLoginToUse />} />
          )}
          {userIsLoggedIn === true ? (
            <Route path="/todos/new-todo-item" element={<NewToDo />} />
          ) : (
            <Route path="/todos/new-todo-item" element={<MustLoginToUse />} />
          )}

          <Route
            path="/login"
            element={
              <Login
                userIsLoggedIn={userIsLoggedIn}
                setuserIsLoggedIn={setuserIsLoggedIn}
              />
            }
          />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route
            path="/logout"
            element={
              <Logout
                userIsLoggedIn={userIsLoggedIn}
                setuserIsLoggedIn={setuserIsLoggedIn}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
