import axiosClient from "services/axios";
import { ILoginData } from "store/asyncThunk/types";
import { IGetUserDetailBody } from "store/types";
import { IUserFormData } from "types/userType";

class UserApi {
  login = (body: ILoginData) => {
    const url = "/api/login";
    return axiosClient.post(url, body);
  };
  getAllUsers = () => {
    const url = "/api/users";
    return axiosClient.post(url);
  };
  getUserDetail = (body: IGetUserDetailBody) => {
    const url = "/api/users";
    return axiosClient.post(url, body);
  };
  createNewUser = (body: IUserFormData) => {
    const url = "/api/user/create";
    return axiosClient.post(url, body);
  };
  editUser = (body: IUserFormData) => {
    const url = "/api/user/edit";
    return axiosClient.post(url, body);
  };
  deleteUser = (id: string) => {
    const url = "/api/user";
    return axiosClient.delete(url, { data: { id } });
  };
}
const userApi = new UserApi();
export default userApi;
