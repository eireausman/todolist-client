import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";

interface NavigationTopProps {
  userIsLoggedIn: boolean;
  setuserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationTop: React.FC<NavigationTopProps> = ({
  userIsLoggedIn,
  setuserIsLoggedIn,
}) => {
  const [activeMenuTab, setActiveMenuTab] = useState<string>(
    window.location.pathname
  );

  const updateActiveMenuTab = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;

    const targetName: string = target.getAttribute("name")!;
    setActiveMenuTab(targetName);
  };

  return (
    <div className="topNavBar">
      <nav className="topNavBarMenuItems">
        <h1 className="topNavBarHeading">Your To Do List</h1>
        <Link to="/todos">
          <button
            // className="topNavBarButton"
            onClick={(e) => updateActiveMenuTab(e)}
            name="/todos"
            className={
              activeMenuTab === "/todos"
                ? "genericSiteButton activeMenuTab"
                : "genericSiteButton"
            }
          >
            Your Tasks
          </button>
        </Link>
        <Link to="/todos/new-todo-item">
          <button
            onClick={(e) => updateActiveMenuTab(e)}
            name="/todos/new-todo-item"
            className={
              activeMenuTab === "/todos/new-todo-item"
                ? "genericSiteButton activeMenuTab"
                : "genericSiteButton"
            }
          >
            New Task
          </button>
        </Link>
      </nav>
      <div className="topNavBarLoginState">
        {userIsLoggedIn === true ? (
          <Link to="/logout">
            <button
              className={
                activeMenuTab === "/login"
                  ? "genericSiteButton activeMenuTab"
                  : "genericSiteButton"
              }
            >
              {" "}
              Logout
            </button>
          </Link>
        ) : (
          <Fragment>
            <Link to="/createaccount">
              <button
                onClick={(e) => updateActiveMenuTab(e)}
                name="/createaccount"
                className={
                  activeMenuTab === "/createaccount"
                    ? "genericSiteButton activeMenuTab"
                    : "genericSiteButton"
                }
              >
                {" "}
                Create Account
              </button>
            </Link>
            <Link to="/login">
              <button
                onClick={(e) => updateActiveMenuTab(e)}
                name="/login"
                className={
                  activeMenuTab === "/login"
                    ? "genericSiteButton activeMenuTab"
                    : "genericSiteButton"
                }
              >
                Login
              </button>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default NavigationTop;
