import { IUserFormData } from "types/userType";

export interface ILoginData {
  email: string;
  password: string;
}

export interface IEditUser {
  body: IUserFormData;
  id: string;
}

export interface IUpdateBookingStatusBody {
  doctorId: string;
  token: string;
  statusId: string;
}
