import axios from "axios";
import {
  postNewToDoItemFormData,
  EditItemInterface,
  createAccountFormData,
} from "../typeInterfaces/typeInterfaces";
import { BASE_URL } from "../modules/publicEnvVariables";

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

const createAccountAttempt = async (formData: createAccountFormData) => {
  const headerWithToken = await getTokenFromStorage();
  const serverResponse = await axios.post(
    BASE_URL + "/createaccount",
    formData,
    headerWithToken
  );
  return await serverResponse;
};

const getToDos = async () => {
  const x = getTokenFromStorage().then((headerWithToken) => {
    const serverRequest = axios
      .get(BASE_URL + "/todos", headerWithToken)
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
  const x = axios.post(BASE_URL + "/login", formData).then((response) => {
    const requestOutcome: boolean = response.data.message.loginOutcome;
    if (requestOutcome === true) {
      try {
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.message.token)
        );
      } catch (e) {
        return;
      }
    }
    return response.data;
  });
  return await x;
};

const postNewToDoItem = async (formData: postNewToDoItemFormData) => {
  const x = getTokenFromStorage().then((headerWithToken) => {
    const serverRequest = axios
      .post(BASE_URL + "/todos/new-todo-item", formData, headerWithToken)
      .then((serverResponse) => {
        return serverResponse.data;
      });
    return serverRequest;
  });
  return await x;
};

const updateEditedToDoItem = async (formData: EditItemInterface) => {
  const x = getTokenFromStorage().then((headerWithToken) => {
    const serverRequest = axios
      .post(
        BASE_URL + "/todos/update-edited-todo-item",
        formData,
        headerWithToken
      )
      .then((serverResponse) => {
        return serverResponse.data;
      });
    return serverRequest;
  });
  return await x;
};

const userLoginCheck = async () => {
  const headerWithToken = await getTokenFromStorage();
  const serverResponse = await axios.get(
    BASE_URL + "/checktokenvalidity",
    headerWithToken
  );
  return await serverResponse;
};

export {
  userLoginCheck,
  getToDos,
  loginAttempt,
  postNewToDoItem,
  updateEditedToDoItem,
  createAccountAttempt,
};
