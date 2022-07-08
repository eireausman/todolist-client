import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

interface databaseData {
  _id: number;
  title: string;
  detail: string;
  dueDate: number;
  dueDate_formatted: string;
}

const ToDoLists: React.FC = () => {
  const [data, setData] = useState<Array<databaseData>>([]);

  useEffect(() => {
    axios.get("/todos").then((res) => {
      setData(res.data.list_items);
    });
  }, []);

  return (
    <div className="App">
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

      <p className="App-intro"></p>
    </div>
  );
};

export default ToDoLists;
