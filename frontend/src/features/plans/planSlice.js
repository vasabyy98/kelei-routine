import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  plans: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
});

export const { reset } = planSlice.actions;
export default planSlice.reducer;
