import { IUserFormData } from "types/userType";

export interface ILoginData {
  email: string;
  password: string;
}

export interface IEditUser {
  body: IUserFormData;
  id: string;
}
