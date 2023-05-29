export interface IUserFormData {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  address: string;
  roleId: string;
  image?: string;
}

export interface IOption {
  name: string;
  value: string;
}
