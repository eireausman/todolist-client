const ToDoListsTestData = {
  list_items: [
    {
      _id: "62df604e1acf914ced0e6bec",
      title: "asdsad",
      dueDate: "2022-07-27T00:00:00.000Z",
      detail: "asdsads",
      dueDate_formatted: "27 July 2022",
      dueDate_forHTMLForms: "2022-07-27",
    },
    {
      _id: "62ddf6f99b3371ecf83d7ecd",
      title: "sss",
      dueDate: "2000-01-12T00:00:00.000Z",
      detail: "sadgdf fghgfjhmnbeb rtbtr tyn tynyn egr gerg ertb er breb",
      dueDate_formatted: "12 Jan 2000",
      dueDate_forHTMLForms: "2000-01-12",
    },
  ],
  userLoggedIn: true,
};

const editToDoModalServerResponse = {
  updateSuccessful: true,
};

const ToDoListsTestDataAfterModalSave = {
  list_items: [
    {
      _id: "62df604e1acf914ced0e6bec",
      title: "asdsad AAA",
      dueDate: "2022-07-27T00:00:00.000Z",
      detail: "asdsads",
      dueDate_formatted: "27 July 2022",
      dueDate_forHTMLForms: "2022-07-27",
    },
    {
      _id: "62ddf6f99b3371ecf83d7ecd",
      title: "sss",
      dueDate: "2000-01-12T00:00:00.000Z",
      detail: "sadgdf fghgfjhmnbeb rtbtr tyn tynyn egr gerg ertb er breb",
      dueDate_formatted: "12 Jan 2000",
      dueDate_forHTMLForms: "2000-01-12",
    },
  ],
  userLoggedIn: true,
};

const newToDoServerResponseSuccess = {
  Outcome: true,
};

const newToDoServerResponseFailed = {
  Outcome: false,
};

const loginAttemptFailed = {
  message: {
    loginOutcome: false,
  },
};

const loginAttemptSuccess = {
  message: {
    loginOutcome: true,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXIiOiIxMjM0NTY3OCJ9LCJpYXQiOjE2NTg5NjU0ODYsImV4cCI6MTY1OTA1MTg4Nn0.qz-TEtzXZ8OSLwuZ_AhwZtjLVlBL9oYgmHQfzSTIGyQ",
  },
};

const createAccountAttemptSuccess = {
  requestOutcome: true,
  message: "Your account has been created.  Please login",
};

const createAccountAttemptFailed = {
  requestOutcome: false,
  message: "User already exists",
};

export {
  ToDoListsTestData,
  editToDoModalServerResponse,
  ToDoListsTestDataAfterModalSave,
  newToDoServerResponseSuccess,
  newToDoServerResponseFailed,
  loginAttemptFailed,
  loginAttemptSuccess,
  createAccountAttemptSuccess,
  createAccountAttemptFailed,
};
