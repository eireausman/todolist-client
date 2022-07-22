import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container } from "react-bootstrap";

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

  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand href="/todos">To Do List</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-start">
          <Nav variant="pills" activeKey={activeMenuTab}>
            <Nav.Item>
              <Nav.Link href="/todos">Your Tasks</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/todos/new-todo-item">New Task</Nav.Link>
            </Nav.Item>
            {userIsLoggedIn !== true ? (
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="/createaccount">
                  Create Account
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationTop;
