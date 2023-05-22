import axiosClient from "@services/axios";

class HomeApi {
  example = () => {
    const url = "";
    return axiosClient.get(url);
  };
}
const homeApi = new HomeApi();
export default homeApi;
