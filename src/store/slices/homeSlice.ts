import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getUserDetail } from "store/asyncThunk/home";
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

export const homeSlice = createSlice({
  name: "home",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserDetail.pending, (state, action) => {});
    builder.addCase(getUserDetail.fulfilled, (state, action) => {
      state.example = action.payload;
    });
    builder.addCase(getUserDetail.rejected, (state, action) => {});
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.home.value;

export default homeSlice.reducer;
