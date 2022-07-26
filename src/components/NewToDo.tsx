import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { postNewToDoItem } from "../modules/serverRequests";
import {
  NewToDoFormData,
  NewToDoFormSubmissionServerResponse,
} from "../typeInterfaces/typeInterfaces";

const NewToDo: React.FC = () => {
  const [showDueDate, setShowDueDate] = useState<boolean>(false);
  const [formData, setFormData] = useState<NewToDoFormData>({
    dueDate: 0,
    title: "",
    detail: "",
  });
  const [formSubmitResponse, setFormSubmitResponse] =
    useState<NewToDoFormSubmissionServerResponse>({});

  const updateFormDataState = (e: React.FormEvent<EventTarget>) => {
    const formDataCopy: NewToDoFormData = { ...formData };
    const target = e.target as HTMLInputElement;
    const fieldName =
      target.getAttribute("name") ??
      (target.getAttribute("name") as keyof typeof FormData);
    formDataCopy[fieldName] = target.value;
    setFormData(formDataCopy);
  };

  const submitFormData = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    postNewToDoItem(formData).then((serverResponse) => {
      setFormSubmitResponse(serverResponse.Outcome);
    });
  };

  return (
    // {userIsLoggedIn === true ? (
    //   ) : (
    //     <MustLoginToUse />
    //   )}
    <div className="appContainer">
      <section className="genericFormContainer">
        <Form onSubmit={submitFormData}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              title="title (required)"
              placeholder="title (required)"
              required
              minLength={3}
              value={formData.title}
              onChange={(e) => updateFormDataState(e)}
            />
            <Form.Text className="text-muted">
              This is a test system. Share data at your own risk.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Task Detail</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="detail"
              title="detail (optional)"
              value={formData.detail}
              placeholder="detail (optional)"
              onChange={(e) => updateFormDataState(e)}
            />
          </Form.Group>

          {showDueDate ? (
            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                name="dueDate"
                title="dueDate"
                value={formData.dueDate}
                onChange={(e) => updateFormDataState(e)}
              />
            </Form.Group>
          ) : (
            <Form.Group className="mb-3">
              <button
                title="addDueDate"
                onClick={() => setShowDueDate(!showDueDate)}
                className="genericSiteButton"
              >
                Add Due Date
              </button>
            </Form.Group>
          )}

          <button type="submit" className="genericSiteButton">
            Submit
          </button>
          {formSubmitResponse === true && (
            <Alert variant="success" className="mb-3">
              Your task has been saved.
            </Alert>
          )}
          {formSubmitResponse === false && (
            <Alert variant="danger" className="mb-3">
              An error occurred. Please try again.
            </Alert>
          )}
        </Form>
      </section>
    </div>
  );
};

export default NewToDo;
