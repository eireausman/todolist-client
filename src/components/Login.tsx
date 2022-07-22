import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { userLoginCheck, loginAttempt } from "../modules/serverRequests";

interface FormData {
  [key: string]: string | undefined;
  username?: string;
  password?: string;
}

interface serverResponse {
  message?: {
    loginOutcome?: boolean;
    username?: string;
    token?: string;
  };
}

interface LogInProps {
  userIsLoggedIn: boolean;
  setuserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LogInProps> = ({ userIsLoggedIn, setuserIsLoggedIn }) => {
  const [formSubmitResponse, setFormSubmitResponse] = useState<serverResponse>(
    {}
  );
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [showResponseMessage, setshowResponseMessage] =
    useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    userLoginCheck().then((serverResponse) => {
      if (serverResponse.userLoggedIn === true) {
        navigate("/todos?e=" + encodeURIComponent("already logged in"));
      }
    });
  }, [navigate]);

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
    loginAttempt(formData).then((serverResponse) => {
      console.log(serverResponse);
      setFormSubmitResponse(serverResponse);
      setshowResponseMessage(true);

      if (serverResponse.message.loginOutcome === true) {
        setuserIsLoggedIn(true);
        setTimeout(() => {
          navigate("/todos?e=userloggedin");
        }, 2000);
      }
    });
  };
  return (
    <div className="appContainer">
      <section className="genericFormContainer">
        <Form onSubmit={submitFormData}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              minLength={3}
              name="username"
              onChange={(e) => updateFormDataState(e)}
              type="text"
              placeholder="Username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Group className="mb-3">12345678</Form.Group>
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
          <Button variant="primary" className="mb-3" type="submit">
            Submit
          </Button>
          {showResponseMessage && !formSubmitResponse.message?.loginOutcome && (
            <Alert variant="danger" className="mb-3">
              Error with credentials. Please try again.
            </Alert>
          )}
          {showResponseMessage && formSubmitResponse.message?.loginOutcome && (
            <Alert variant="success" className="mb-3">
              Success - please wait while you are redirected...
              <Spinner animation="border" variant="primary" />
            </Alert>
          )}
        </Form>
      </section>
    </div>
  );
};

export default Login;
