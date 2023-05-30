import axiosClient from "services/axios";
import { IGetUserDetailBody } from "store/types";

class DoctorApi {
  getAllDoctors = () => {
    const url = "/api/doctors";
    return axiosClient.get(url);
  };
  getDoctorInfo = (body: IGetUserDetailBody) => {
    const url = "/api/get-infomation";
    return axiosClient.post(url, body);
  };
}
const doctorApi = new DoctorApi();
export default doctorApi;
