import axios from "axios";
import { toast } from "react-toastify";
import i18n from "i18n";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Headers": "X-Requested-With",
  },
  withCredentials: true,
  headers: { "Access-Control-Allow-Origin": "*" },
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode = error.response?.status;
    if (statusCode >= 400 && statusCode < 500) {
      if (error.response?.data?.duplicate) throw error;
      toast.error(
        i18n.t(error.response?.data?.message || error.response?.data?.body)
      );
      throw error;
    }
    if (statusCode === 500) {
      toast.error("Something went wrong, please try again!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    throw error;
  }
);
export default API;
