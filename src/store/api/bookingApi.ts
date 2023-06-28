import axiosClient from "services/axios";
import { IUpdateBookingStatusBody } from "store/asyncThunk/types";

class BookingApi {
  updateBookingStatus = (body: IUpdateBookingStatusBody) => {
    const url = "/api/update-booking";
    return axiosClient.post(url, body);
  };
}
const bookingApi = new BookingApi();
export default bookingApi;
