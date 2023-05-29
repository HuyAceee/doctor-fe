import axiosClient from "services/axios";

class AllCodeApi {
  getAllCode = (params?: any) => {
    const url = "/api/allcode";
    return axiosClient.get(url, { params });
  };
}
const allCodeApi = new AllCodeApi();
export default allCodeApi;
