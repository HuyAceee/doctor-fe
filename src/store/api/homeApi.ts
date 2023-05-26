import axiosClient from "services/axios";
import { IGetUserDetailBody } from "store/types";

class HomeApi {
  getUserDetail = (body: IGetUserDetailBody) => {
    const url = "/api/users";
    return axiosClient.post(url, { body });
  };
}
const homeApi = new HomeApi();
export default homeApi;
