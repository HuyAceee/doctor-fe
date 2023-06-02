import axiosClient from "services/axios";
import {
  ICreateScheduleBody,
  IGetSchuduleDoctorInDateBody,
  IGetUserDetailBody,
} from "store/types";

class DoctorApi {
  getAllDoctors = () => {
    const url = "/api/doctors";
    return axiosClient.get(url);
  };
  getDoctorInfo = (body: IGetUserDetailBody) => {
    const url = "/api/get-infomation";
    return axiosClient.post(url, body);
  };
  getScheduleInDate = (body: IGetSchuduleDoctorInDateBody) => {
    const url = "/api/schedule-doctor-in-date";
    return axiosClient.post(url, body);
  };

  createSchedule = (body: ICreateScheduleBody[]) => {
    const url = "/api/create-schedule";
    return axiosClient.post(url, body);
  };
}
const doctorApi = new DoctorApi();
export default doctorApi;
