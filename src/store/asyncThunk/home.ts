import { createAsyncThunk } from "@reduxjs/toolkit";
import homeApi from "store/api/homeApi";
import { IGetUserDetailBody } from "store/types";

export const getUserDetail = createAsyncThunk(
  "home/users",
  async (body: IGetUserDetailBody) => {
    const res = await homeApi.getUserDetail(body);
    return res;
  }
);

