import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getUserDetail, login } from "store/asyncThunk/user";
import { RootState } from "store/store";
import { IUserDetail } from "store/types";

// Define a type for the slice state
interface IInitialState {
  userList: IUserDetail[];
  userDetail: IUserDetail;
  example: string[];
}

// Define the initial state using that type
const initialState: IInitialState = {
  userList: [],
  userDetail: {
    id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    gender: "",
    roleId: "",
    phoneNumber: "",
    positionId: "",
    image: "",
    createAt: "",
    updateAt: "",
  },
  example: [],
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.pending, (state, action) => {});
    builder.addCase(login.fulfilled, (state, action) => {
      state.userDetail = action.payload.users;
    });
    builder.addCase(login.rejected, (state, action) => {});
    builder.addCase(getUserDetail.fulfilled, (state, action) => {
      state.userDetail = action.payload.users;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.userList = action.payload.users;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
