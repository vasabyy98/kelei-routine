import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import planService from "./planService";

const initialState = {
  plans: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// create new plan
export const createPlan = createAsyncThunk("plans/create", async (planData, thunkAPI) => {
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

// // delete exercise
// export const deleteExercise = createAsyncThunk("exercises/delete", async (id, thunkAPI) => {
//   try {
//     const token = thunkAPI.getState().auth.user.token;
//     return await exerciseService.deleteExercise(id, token);
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();

//     return thunkAPI.rejectWithValue(message);
//   }
// });

export const planSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    resetPlans: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.plans.push(action.payload);
      })
      .addCase(createPlan.rejected, (state, action) => {
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
