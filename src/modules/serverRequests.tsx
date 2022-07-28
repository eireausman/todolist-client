import axios from "axios";
import {
  postNewToDoItemFormData,
  EditItemInterface,
  createAccountFormData,
  LoginAttemptFormData,
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
    // should replace with something that avoids making a server call downstream
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
  return await serverResponse.data;
};

const getToDos = async () => {
  const headerWithToken = await getTokenFromStorage();
  const serverResponse = await axios.get(BASE_URL + "/todos", headerWithToken);
  return await serverResponse.data;
};

const loginAttempt = async (formData: LoginAttemptFormData) => {
  const serverResponse = await axios.post(BASE_URL + "/login", formData);
  const requestOutcome: boolean = await serverResponse.data.message
    .loginOutcome;
  if (requestOutcome === true) {
    try {
      localStorage.setItem(
        "token",
        JSON.stringify(serverResponse.data.message.token)
      );
    } catch (e) {
      return;
    }
  }
  return await serverResponse.data;
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
  const headerWithToken = await getTokenFromStorage();
  const serverResponse = await axios.post(
    BASE_URL + "/todos/update-edited-todo-item",
    formData,
    headerWithToken
  );
  return await serverResponse.data;
};

const userLoginCheck = async () => {
  const headerWithToken = await getTokenFromStorage();
  const serverResponse = await axios.get(
    BASE_URL + "/checktokenvalidity",
    headerWithToken
  );
  return await serverResponse.data;
};

export {
  userLoginCheck,
  getToDos,
  loginAttempt,
  postNewToDoItem,
  updateEditedToDoItem,
  createAccountAttempt,
};
