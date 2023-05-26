import { createSlice } from "@reduxjs/toolkit";
import { login } from "store/asyncThunk/user";
import { RootState } from "store/store";

// Define a type for the slice state
interface CounterState {
  value: number;
  example: string[];
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
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
      console.log(action.payload);
    });
    builder.addCase(login.rejected, (state, action) => {});
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.value;

export default userSlice.reducer;
