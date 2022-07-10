import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import planService from "./planService";
const initialState = {
  plans: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// add plan
export const createWorkoutPlan = createAsyncThunk("plans/create", async (planData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await planService.createPlan(planData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// get user plans
export const getPlans = createAsyncThunk("plans/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await planService.getPlans(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    resetPlans: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWorkoutPlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWorkoutPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.plans.push(action.payload);
      })
      .addCase(createWorkoutPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPlans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.plans = action.payload;
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetPlans } = planSlice.actions;
export default planSlice.reducer;
