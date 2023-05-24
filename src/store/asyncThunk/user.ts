import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "store/api/userApi";
import { ILoginData } from "./types";

export const login = createAsyncThunk(
  "login/login",
  async (data: ILoginData) => {
    const res = await userApi.login(data);
    return res;
  }
);
