import axiosClient from "services/axios";
import { ILoginData } from "store/asyncThunk/types";

class LoginAPi {
  login = (body: ILoginData) => {
    const url = "/api/login";
    return axiosClient.post(url, body);
  };
}
const loginApi = new LoginAPi();
export default loginApi;
