import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { userLoginCheck, loginAttempt } from "../modules/serverRequests";
import { USERNAMEMIN, PASSWORDMIN } from "../modules/publicEnvVariables";
import { LoginAttemptFormData } from "../typeInterfaces/typeInterfaces";

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
  const [formData, setFormData] = useState<LoginAttemptFormData>({
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
    const formDataCopy: LoginAttemptFormData = { ...formData };
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
          <Form.Group className="mb-3" data-testid="login-box-header">
            LOGIN
          </Form.Group>
          <Form.Group className="mb-3">
            Test Account Username and Password: 12345678
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label visuallyHidden>Username</Form.Label>
            <Form.Control
              data-testid="username-input-field"
              required
              minLength={USERNAMEMIN}
              name="username"
              onChange={(e) => updateFormDataState(e)}
              type="text"
              placeholder="Username (required)"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label visuallyHidden>Password</Form.Label>
            <Form.Control
              data-testid="password-input-field"
              required
              name="password"
              minLength={PASSWORDMIN}
              onChange={(e) => updateFormDataState(e)}
              type="password"
              placeholder="Password (required)"
            />
          </Form.Group>
          <button
            data-testid="login-form-submitButton"
            type="submit"
            className="genericSiteButton"
          >
            Submit
          </button>

          {showResponseMessage && !formSubmitResponse.message?.loginOutcome && (
            <Alert
              data-testid="loginFailureMessage"
              variant="danger"
              className="mb-3"
            >
              Error with credentials. Please try again.
            </Alert>
          )}
          {showResponseMessage && formSubmitResponse.message?.loginOutcome && (
            <Alert
              data-testid="loginSuccessMessage"
              variant="success"
              className="mb-3"
            >
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
