import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import { userLoginCheck } from "../modules/serverRequests";

interface FormData {
  [key: string]: string | undefined;
  username?: string;
  password?: string;
}

interface serverResponse {
  requestOutcome?: boolean;
  message?: string;
}

const CreateAccount: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [formSubmitResponse, setFormSubmitResponse] = useState<serverResponse>(
    {}
  );
  const [showResponseMessage, setshowResponseMessage] =
    useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginState = async () => {
      await userLoginCheck().then((serverResponse) => {
        if (serverResponse.userLoggedIn === true) {
          navigate("/todos?e=" + encodeURIComponent("already logged in"));
        }
      });
    };
    checkLoginState();
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
    Axios.post("/createaccount", formData).then((response) => {
      console.log(response.status);
      console.log(response.data);
      setFormSubmitResponse(response.data);
      setshowResponseMessage(true);
    });
  };
  return (
    <div className="appContainer">
      <section className="genericFormContainer">
        <Form onSubmit={submitFormData}>
          <Form.Group className="mb-3">CREATE ACCOUNT</Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="mb-3" visuallyHidden>
              Username
            </Form.Label>
            <Form.Control
              required
              name="username"
              minLength={3}
              onChange={(e) => updateFormDataState(e)}
              type="text"
              placeholder="Username (required)"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label visuallyHidden>Password</Form.Label>
            <Form.Control
              required
              name="password"
              minLength={8}
              onChange={(e) => updateFormDataState(e)}
              type="password"
              placeholder="Password (required)"
            />
          </Form.Group>
          <button type="submit" className="genericSiteButton">
            Submit
          </button>
          {showResponseMessage && !formSubmitResponse.requestOutcome && (
            <Alert variant="danger">{formSubmitResponse.message}</Alert>
          )}
          {showResponseMessage && formSubmitResponse.requestOutcome && (
            <Alert variant="success">{formSubmitResponse.message}</Alert>
          )}
          <Form.Group className="mb-3">
            Already have an account? <Link to="/login">Login here</Link>.
          </Form.Group>
        </Form>
      </section>
    </div>
  );
};

export default CreateAccount;
