import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { getToDos } from "../modules/serverRequests";
import MustLoginToUse from "./MustLoginToUse";

interface databaseData {
  _id: number;
  title: string;
  detail: string;
  dueDate: number;
  dueDate_formatted: string;
}

interface ToDoListsProps {
  userIsLoggedIn: boolean;
  setuserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToDoLists: React.FC<ToDoListsProps> = ({
  userIsLoggedIn,
  setuserIsLoggedIn,
}) => {
  const [data, setData] = useState<Array<databaseData>>([]);

  useEffect(() => {
    getToDos().then((serverResponse) => {
      if (serverResponse.userLoggedIn === true) {
        setData(serverResponse.list_items);
        setuserIsLoggedIn(true);
      } else {
        setuserIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <div className="appContainer">
      <div className="cardsContainer">
        {data.map((toDoItem) => (
          <Card style={{ width: "18rem" }} key={toDoItem._id}>
            <Card.Body>
              <Card.Title>{toDoItem.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Due: {toDoItem.dueDate_formatted}
              </Card.Subtitle>
              <Card.Text>{toDoItem.detail}</Card.Text>
              <Card.Link href="#">Edit Card</Card.Link>
              <Card.Link href="#">Delete Card</Card.Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ToDoLists;
