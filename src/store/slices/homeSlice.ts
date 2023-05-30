import { createSlice } from "@reduxjs/toolkit";
import { getUserDetail } from "store/asyncThunk/user";
import { RootState } from "store/store";

// Define a type for the slice state
interface IInitialState {
  example: string[];
}

// Define the initial state using that type
const initialState: IInitialState = {
  example: [],
};

export const homeSlice = createSlice({
  name: "home",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserDetail.pending, (state, action) => {});
    builder.addCase(getUserDetail.fulfilled, (state, action) => {});
    builder.addCase(getUserDetail.rejected, (state, action) => {});
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectHome = (state: RootState) => state.home;

export default homeSlice.reducer;
