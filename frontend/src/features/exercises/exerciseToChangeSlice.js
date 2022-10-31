import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import exerciseService from "./exerciseService";

const initialState = {
  exerciseName: "",
  currentWeight: "",
  rm: "",
  exercise_id: "",
  isError: false,
  isLoading: false,
  isSuccess: true,
  message: "",
};

export const updateExercise = createAsyncThunk(
  "exercises/update",
  async (exerciseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await exerciseService.updateExercise(exerciseData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const chosenExerciseSlice = createSlice({
  name: "chosenExercise",
  initialState,
  reducers: {
    resetChosenExercise: (state) => initialState,
    setCurrentExercise: (state, action) => {
      state.exerciseName = action.payload.exerciseName;
      state.currentWeight = action.payload.currentWeight;
      state.rm = action.payload.rm;
      state.exercise_id = action.payload._id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateExercise.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(updateExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exerciseName = action.payload.exerciseName;
        state.currentWeight = action.payload.currentWeight;
        state.rm = action.payload.rm;
      })
      .addCase(updateExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetChosenExercise, setCurrentExercise } = chosenExerciseSlice.actions;

export default chosenExerciseSlice.reducer;
