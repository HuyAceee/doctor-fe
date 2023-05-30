import { createSlice } from "@reduxjs/toolkit";
import { getAllDoctors, getDoctorInfo } from "store/asyncThunk/doctor";
import { RootState } from "store/store";
import { IDoctorInfo, IUserDetail } from "store/types";

// Define a type for the slice state
interface IInitialState {
  doctorList: IUserDetail[];
  doctorDetail: IUserDetail;
  doctorInfo: IDoctorInfo;
}

// Define the initial state using that type
const initialState: IInitialState = {
  doctorList: [],
  doctorDetail: {
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
  doctorInfo: {
    addressClinic: "",
    count: "",
    doctorId: "",
    id: "",
    nameClinic: "",
    note: "",
    paymentId: "",
    priceId: "",
    provinceId: "",
  },
};

export const doctorSlice = createSlice({
  name: "doctor",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllDoctors.fulfilled, (state, action) => {
      state.doctorList = action.payload.doctors;
    });
    builder.addCase(getDoctorInfo.fulfilled, (state, action) => {
      state.doctorInfo = action.payload.info;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const doctorSelector = (state: RootState) => state.doctor;

export default doctorSlice.reducer;
