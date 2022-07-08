import React, { useState } from "react";
import Axios from "axios";
import { Form, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

interface FormData {
  [key: string]: string | undefined;
  username?: string;
  password?: string;
}

interface serverResponse {
  Outcome?: string;
}

interface CreateAccountModalProps {
  showCreateAccountModal: boolean;
  handleCloseCreateAccountModal: () => void;
}

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({
  showCreateAccountModal,
  handleCloseCreateAccountModal,
}) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [formSubmitResponse, setFormSubmitResponse] = useState<serverResponse>(
    {}
  );
  const [showResponseMessage, setshowResponseMessage] =
    useState<boolean>(false);

  const updateFormDataState = (e: React.FormEvent<EventTarget>) => {
    const formDataCopy: FormData = { ...formData };
    const target = e.target as HTMLInputElement;

    const fieldName =
      target.getAttribute("name") ??
      (target.getAttribute("name") as keyof typeof FormData);
    formDataCopy[fieldName] = target.value;
    setFormData(formDataCopy);
  };

  const submitFormData = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    Axios.post("/createaccount", formData).then((response) => {
      console.log(response.status);
      console.log(response.data);
      setFormSubmitResponse(response.data);
    });
  };

  return (
    <Modal show={showCreateAccountModal} onHide={handleCloseCreateAccountModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitFormData}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              name="username"
              minLength={3}
              onChange={(e) => updateFormDataState(e)}
              type="text"
              placeholder="Username"
            />
            <Form.Text className="text-muted">
              This is a test system. Share data at your own risk.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name="password"
              minLength={8}
              onChange={(e) => updateFormDataState(e)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      {/* 
      <Modal.Footer>
        {showResponseMessage && !formSubmitResponse.LoginOutcome && (
          <Alert variant="danger">
            Error with credentials. Please try again.
          </Alert>
        )}
        {showResponseMessage && formSubmitResponse.LoginOutcome && (
          <Alert variant="success">
            Success - please wait while you are redirected...
          </Alert>
        )}
      </Modal.Footer> */}
    </Modal>
  );
};

export default CreateAccountModal;
