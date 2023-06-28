import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingApi from "store/api/bookingApi";
import { IUpdateBookingStatusBody } from "./types";

export const updateBookingStatus = createAsyncThunk(
  "home/allcode",
  async (body: IUpdateBookingStatusBody) => {
    const res = await bookingApi.updateBookingStatus(body);
    return res;
  }
);
