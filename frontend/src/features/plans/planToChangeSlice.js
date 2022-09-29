import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import planService from "./planService";
import exerciseService from "./planService";

const initialState = {
  planName: "",
  routine: "",
  volume: "",
  exercises: [],
  plan_id: "",
  isError: false,
  isLoading: false,
  isSuccess: true,
  message: "",
};

export const updatePlan = createAsyncThunk("plans/update", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await planService.updatePlan(data, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const chosenPlanSlice = createSlice({
  name: "chosenPlan",
  initialState,
  reducers: {
    resetChosenPlan: (state) => initialState,
    setCurrentPlan: (state, action) => {
      state.planName = action.payload.planName;
      state.routine = action.payload.routine;
      state.volume = action.payload.volume;
      state.plan_id = action.payload._id;
      state.exercises.push(action.payload.exercises);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePlan.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.planName = action.payload.planName;
        state.routine = action.payload.routine;
        state.volume = action.payload.volume;
        state.exercises = action.payload.exercises;
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetChosenPlan, setCurrentPlan } = chosenPlanSlice.actions;

export default chosenPlanSlice.reducer;
