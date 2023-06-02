import { createAsyncThunk } from "@reduxjs/toolkit";
import doctorApi from "store/api/doctorApi";
import {
  ICreateScheduleBody,
  IGetSchuduleDoctorInDateBody,
  IGetUserDetailBody,
} from "store/types";

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

export const getScheduleInDate = createAsyncThunk(
  "home/get-schedule-doctor-in-date",
  async (body: IGetSchuduleDoctorInDateBody) => {
    const res = await doctorApi.getScheduleInDate(body);
    return res;
  }
);

export const createSchedule = createAsyncThunk(
  "home/get-schedule-doctor-in-date",
  async (body: ICreateScheduleBody[]) => {
    const res = await doctorApi.createSchedule(body);
    return res;
  }
);
