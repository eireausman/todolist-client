import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Axios from "axios";
import { postNewToDoItem } from "../modules/serverRequests";

interface FormData {
  [key: string]: string | number | undefined;
  dueDate?: number;
  title?: string;
  detail?: string;
}

interface serverResponse {
  Outcome?: boolean;
}

const NewToDo: React.FC = () => {
  const [showDueDate, setShowDueDate] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    dueDate: 0,
    title: "",
    detail: "",
  });
  const [formSubmitResponse, setFormSubmitResponse] = useState<serverResponse>(
    {}
  );

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
              <Button
                title="addDueDate"
                onClick={() => setShowDueDate(!showDueDate)}
              >
                Add Due Date
              </Button>
            </Form.Group>
          )}

          <Button variant="primary" type="submit" className="mb-3">
            Submit
          </Button>
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
