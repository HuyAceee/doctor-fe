import { createAsyncThunk } from "@reduxjs/toolkit";
import homeApi from "@store/api/homeApi";

export const getExample = createAsyncThunk("home/example", async () => {
  const res = await homeApi.example();
  return res;
});
