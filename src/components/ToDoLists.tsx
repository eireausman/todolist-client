import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import EditToDoModal from "./EditToDoModal";
import { getToDos } from "../modules/serverRequests";

import {
  EditItemInterface,
  ToDoListsDatabaseData,
} from "../typeInterfaces/typeInterfaces";

interface ToDoListsProps {
  userIsLoggedIn: boolean;
  setuserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToDoLists: React.FC<ToDoListsProps> = ({
  userIsLoggedIn,
  setuserIsLoggedIn,
}) => {
  const [toDosFromDatabase, setToDosFromDatabase] = useState<
    Array<ToDoListsDatabaseData>
  >([]);
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const [editItem, setEditItem] = useState<EditItemInterface>({});
  const [editModalBeingShown, seteditModalBeingShown] =
    useState<boolean>(false);

  useEffect(() => {
    getToDos().then((serverResponse) => {
      if (serverResponse.userLoggedIn === true) {
        setToDosFromDatabase(serverResponse.list_items);
        setShowSpinner(false);
        setuserIsLoggedIn(true);
      } else {
        setuserIsLoggedIn(false);
      }
    });
  }, [setuserIsLoggedIn]);

  const closeModal = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLDivElement;
    if (target.id !== "editModalContainer") {
      return;
    }
    seteditModalBeingShown(false);
    setEditItem({});
  };

  const showEditModal = (cardid: number) => {
    const item: ToDoListsDatabaseData | undefined = toDosFromDatabase.find(
      (db_entry) => db_entry._id === cardid
    );
    if (item === undefined) {
      throw new Error("no item found");
    }
    seteditModalBeingShown(true);
    setEditItem(item);
  };

  return (
    <div className="appContainer">
      {showSpinner === true && (
        <Button variant="primary" className="mb-5" disabled>
          <Spinner
            data-testid="loading_spinner"
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      )}
      <section className="cardsContainer">
        {toDosFromDatabase.map((toDoItem) => (
          <div
            key={toDoItem._id}
            className="toDoCard"
            onClick={() => showEditModal(toDoItem._id)}
          >
            <div className="cardTitle" data-testid={toDoItem._id}>
              {toDoItem.title}
            </div>
            <div className="cardDetail">{toDoItem.detail}</div>
            {toDoItem.dueDate_formatted !== "1 Jan 2000" && (
              <div className="cardDate">{toDoItem.dueDate_formatted}</div>
            )}
          </div>
        ))}
      </section>
      <EditToDoModal
        editItem={editItem}
        setEditItem={setEditItem}
        closeModal={closeModal}
        editModalBeingShown={editModalBeingShown}
        seteditModalBeingShown={seteditModalBeingShown}
        setToDosFromDatabase={setToDosFromDatabase}
      />
    </div>
  );
};

export default ToDoLists;
