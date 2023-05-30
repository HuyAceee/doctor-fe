import { createAsyncThunk } from "@reduxjs/toolkit";
import doctorApi from "store/api/doctorApi";
import { IGetUserDetailBody } from "store/types";

export const getAllDoctors = createAsyncThunk("home/doctors", async () => {
  const res = await doctorApi.getAllDoctors();
  return res;
});

export const getDoctorInfo = createAsyncThunk(
  "home/doctor_info",
  async (body: IGetUserDetailBody) => {
    const res = await doctorApi.getDoctorInfo(body);
    return res;
  }
);
