import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "store/api/userApi";
import { ILoginData } from "./types";
import { IGetUserDetailBody } from "store/types";
import { IUserFormData } from "types/userType";

export const login = createAsyncThunk(
  "login/login",
  async (data: ILoginData) => {
    const res = await userApi.login(data);
    return res;
  }
);

export const getUserDetail = createAsyncThunk(
  "home/user",
  async (body: IGetUserDetailBody) => {
    const res = await userApi.getUserDetail(body);
    return res;
  }
);

export const getAllUsers = createAsyncThunk("home/users", async () => {
  const res = await userApi.getAllUsers();
  return res;
});

export const createNewUser = createAsyncThunk(
  "home/user/new",
  async (body: IUserFormData) => {
    const res = await userApi.createNewUser(body);
    return res;
  }
);

export const editUser = createAsyncThunk(
  "home/user/eidt",
  async (body: IUserFormData) => {
    const res = await userApi.editUser(body);
    return res;
  }
);

export const deleteUser = createAsyncThunk(
  "home/user/delete",
  async (id: string) => {
    const res = await userApi.deleteUser(id);
    return res;
  }
);
