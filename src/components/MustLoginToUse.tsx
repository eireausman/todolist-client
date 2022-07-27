import React from "react";
import Card from "react-bootstrap/Card";

const MustLoginToUse = () => {
  return (
    <div className="appContainer">
      <div className="cardsContainer">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Please Login</Card.Title>
            <Card.Text data-testid="must_be_logged_in">
              You must be logged in to use this application.
            </Card.Text>
            <Card.Link href="/login">Login</Card.Link>
            <Card.Link href="/createaccount">Create Account</Card.Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default MustLoginToUse;
