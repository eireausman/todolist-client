export interface createAccountFormData {
  [key: string]: string | undefined;
  username?: string;
  password?: string;
}

export interface EditItemInterface {
  [key: string]: string | number | undefined;
  _id?: number;
  title?: string;
  detail?: string;
  dueDate?: number;
  dueDate_forHTMLForms?: string;
  dueDate_formatted?: string;
}

export interface NewToDoFormData {
  [key: string]: string | number | undefined;
  dueDate?: number;
  title?: string;
  detail?: string;
}

export interface postNewToDoItemFormData {
  [key: string]: string | number | undefined;
  dueDate?: number;
  title?: string;
  detail?: string;
}

export interface NewToDoFormSubmissionServerResponse {
  Outcome?: boolean;
}

export interface ToDoListsDatabaseData {
  [key: string]: string | number;
  _id: number;
  title: string;
  detail: string;
  dueDate: number;
  dueDate_forHTMLForms: string;
  dueDate_formatted: string;
}
