import axios from "axios";

const getTokenFromStorage = async () => {
  const token: string | null = localStorage.getItem("token");
  if (token !== null) {
    const requestConfig: object = {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` },
    };
    return requestConfig;
  } else {
    const requestConfig: object = {
      headers: { Authorization: `Bearer noToken` },
    };
    return requestConfig;
  }
};

const userLoginCheck = async () => {
  const x = getTokenFromStorage().then((headerWithToken) => {
    const serverRequest = axios
      .get("/checktokenvalidity", headerWithToken)
      .then((serverResponse) => {
        return serverResponse.data;
      });
    return serverRequest;
  });
  return await x;
};

const getToDos = async () => {
  const x = getTokenFromStorage().then((headerWithToken) => {
    const serverRequest = axios
      .get("/todos", headerWithToken)
      .then((serverResponse) => {
        return serverResponse.data;
      });
    return serverRequest;
  });
  return await x;
};

interface loginAttemptFormData {
  [key: string]: string | undefined;
  username?: string;
  password?: string;
}

const loginAttempt = async (formData: loginAttemptFormData) => {
  const x = axios.post("/login", formData).then((response) => {
    console.log(response);
    const requestOutcome: boolean = response.data.message.loginOutcome;
    console.log(requestOutcome);
    if (requestOutcome === true) {
      try {
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.message.token)
        );
        console.log(response.data);
      } catch (e) {
        console.log(e);
        return;
      }
    }
    return response.data;
  });
  return await x;
};

interface postNewToDoItemFormData {
  [key: string]: string | number | undefined;
  dueDate?: number;
  title?: string;
  detail?: string;
}

const postNewToDoItem = async (formData: postNewToDoItemFormData) => {
  const x = getTokenFromStorage().then((headerWithToken) => {
    const serverRequest = axios
      .post("/todos/new-todo-item", formData, headerWithToken)
      .then((serverResponse) => {
        return serverResponse.data;
      });
    return serverRequest;
  });
  return await x;
};

export { userLoginCheck, getToDos, loginAttempt, postNewToDoItem };
