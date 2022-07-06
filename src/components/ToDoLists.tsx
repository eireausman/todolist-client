import React, { useEffect, useState } from "react";
import axios from "axios";

interface databaseData {
  _id: number;
  title: string;
  detail: string;
  dueDate: number;
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
        <div key={toDoItem._id}>
          <p>{toDoItem.title}</p>
          <p>{toDoItem.detail}</p>
          <p>{toDoItem.dueDate}</p>
          ------
        </div>
      ))}
      <p className="App-intro"></p>
    </div>
  );
};

export default ToDoLists;
