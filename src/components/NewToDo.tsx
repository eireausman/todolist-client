import React, { useState } from "react";
import Axios from "axios";

interface FormData {
  [key: string]: string | number | undefined;
  dueDate?: number;
  title?: string;
  detail?: string;
}

interface serverResponse {
  Outcome?: string;
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
    Axios.post("/todos/new-todo-item", formData).then((response) => {
      console.log(response.status);
      console.log(response.data);
      setFormSubmitResponse(response.data);
    });
  };

  return (
    <div>
      <form onSubmit={submitFormData}>
        <input
          type="text"
          name="title"
          title="title"
          placeholder="title"
          required
          minLength={3}
          value={formData.title}
          onChange={(e) => updateFormDataState(e)}
        ></input>
        <input
          type="text"
          name="detail"
          title="detail"
          value={formData.detail}
          placeholder="detail"
          onChange={(e) => updateFormDataState(e)}
        ></input>
        {showDueDate ? (
          <input
            type="date"
            name="dueDate"
            title="dueDate"
            value={formData.dueDate}
            onChange={(e) => updateFormDataState(e)}
          ></input>
        ) : (
          <button
            title="addDueDate"
            onClick={() => setShowDueDate(!showDueDate)}
          >
            Add Due Date
          </button>
        )}
        <input type="submit"></input>
      </form>
      {formSubmitResponse.Outcome && <p>{formSubmitResponse.Outcome}</p>}
    </div>
  );
};

export default NewToDo;
