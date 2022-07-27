import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

import { updateEditedToDoItem, getToDos } from "../modules/serverRequests";
import {
  EditItemInterface,
  ToDoListsDatabaseData,
} from "../typeInterfaces/typeInterfaces";

interface EditToDoModalProps {
  editItem: EditItemInterface;
  setEditItem: React.Dispatch<React.SetStateAction<EditItemInterface>>;
  closeModal: (e: React.FormEvent<EventTarget>) => void;
  editModalBeingShown: boolean;
  seteditModalBeingShown: React.Dispatch<React.SetStateAction<boolean>>;
  setToDosFromDatabase: React.Dispatch<
    React.SetStateAction<ToDoListsDatabaseData[]>
  >;
}

const EditToDoModal: React.FC<EditToDoModalProps> = ({
  editItem,
  setEditItem,
  closeModal,
  editModalBeingShown,
  seteditModalBeingShown,
  setToDosFromDatabase,
}) => {
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const updateFormDataState = (e: React.FormEvent<EventTarget>) => {
    const editItemCopy: EditItemInterface = { ...editItem };
    const target = e.target as HTMLInputElement;
    const fieldName =
      target.getAttribute("name") ??
      (target.getAttribute("name") as keyof typeof editItem);
    editItemCopy[fieldName] = target.value;
    setEditItem(editItemCopy);
  };

  const submitFormData = (e: React.FormEvent<EventTarget>) => {
    setShowSpinner(true);
    e.preventDefault();

    updateEditedToDoItem(editItem).then((serverResponse) => {
      if (serverResponse.updateSuccessful === true) {
        getToDos().then((serverResponse) => {
          if (serverResponse.userLoggedIn === true) {
            setToDosFromDatabase(serverResponse.list_items);
            setShowSpinner(false);
          } else {
            // return error to user: not saved due to token expiration most likely
          }
        });
        seteditModalBeingShown(false);
        setShowSpinner(false);
      }
    });
  };

  return (
    <div
      onClick={(e) => closeModal(e)}
      data-testid="closeModalClickTrigger"
      className={
        editModalBeingShown === true
          ? "editModalContainer editModalContainerShow"
          : "editModalContainer "
      }
      id="editModalContainer"
    >
      <div className="editModal">
        <form action="#" className="editModalForm" onSubmit={submitFormData}>
          <input
            data-testid={"modalitemid-" + editItem._id!}
            type="hidden"
            name="itemid"
            value={editItem._id! ? editItem._id : ""}
          />
          <label>
            <p>Title</p>

            <input
              data-testid="editModalTitleField"
              className="editModalInputField"
              type="text"
              id="title"
              name="title"
              minLength={3}
              value={editItem.title! ? editItem.title : ""}
              onChange={(e) => updateFormDataState(e)}
            />
          </label>

          <textarea
            className="editModalInputField"
            name="detail"
            value={editItem.detail! ? editItem.detail : ""}
            onChange={(e) => updateFormDataState(e)}
          />

          <input
            className="editModalInputField"
            type="date"
            name="dueDate_forHTMLForms"
            value={
              editItem.dueDate_forHTMLForms!
                ? editItem.dueDate_forHTMLForms
                : ""
            }
            onChange={(e) => updateFormDataState(e)}
          />

          <button
            data-testid="editModalSaveChangesButton"
            className="genericSiteButton"
          >
            Save Changes
          </button>
          {showSpinner === true && (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default EditToDoModal;
