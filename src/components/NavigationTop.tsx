import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import CreateAccountModal from "./CreateAccountModal";

import LoginModal from "./LoginModal";

const NavigationTop: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleCloseLogin = () => setShowLoginModal(false);
  const handleLoginShow = () => setShowLoginModal(true);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const handleCloseCreateAccountModal = () => setShowCreateAccountModal(false);
  const handleCreateAccountShowModal = () => setShowCreateAccountModal(true);
  const [activeMenuTab, setActiveMenuTab] = useState<string>(
    window.location.pathname
  );

  return (
    <Nav variant="tabs" activeKey={activeMenuTab}>
      <Nav.Item>
        <Nav.Link href="/todos">Your Tasks</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/todos/new-todo-item">New Task</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="/createaccount"
          onClick={handleCreateAccountShowModal}
        >
          Create Account
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/login" onClick={handleLoginShow}>
          login
        </Nav.Link>
      </Nav.Item>
      {showLoginModal && (
        <LoginModal
          showLoginModal={showLoginModal}
          handleCloseLogin={handleCloseLogin}
        />
      )}
      {showCreateAccountModal && (
        <CreateAccountModal
          showCreateAccountModal={showCreateAccountModal}
          handleCloseCreateAccountModal={handleCloseCreateAccountModal}
        />
      )}
    </Nav>
  );
};

export default NavigationTop;
