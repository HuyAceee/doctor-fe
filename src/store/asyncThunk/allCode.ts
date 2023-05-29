import { createAsyncThunk } from "@reduxjs/toolkit";
import allCodeApi from "store/api/allCodeApi";

export const getAllCode = createAsyncThunk(
  "home/allcode",
  async (params?: any) => {
    const res = await allCodeApi.getAllCode(params);
    return res;
  }
);
