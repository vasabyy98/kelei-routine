import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import exerciseService from "./exerciseService";

const initialState = {
  exercises: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// create new exercise
export const createExercise = createAsyncThunk(
  "exercises/create",
  async (exerciseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await exerciseService.createExercise(exerciseData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get user exercises
export const getExercises = createAsyncThunk("exercises/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await exerciseService.getExercise(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// delete exercise
export const deleteExercise = createAsyncThunk("exercises/delete", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await exerciseService.deleteExercise(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// update exercise
// export const updateExercise = createAsyncThunk("exercises/update", async (id, data, thunkAPI) => {
//   try {
//     const token = thunkAPI.getState().auth.user.token;
//     return await exerciseService.updateExercise(id, data, token);
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();

//     return thunkAPI.rejectWithValue(message);
//   }
// });

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    resetExercises: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExercise.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exercises.push(action.payload);
      })
      .addCase(createExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getExercises.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExercises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exercises = action.payload;
      })
      .addCase(getExercises.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteExercise.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exercises = state.exercises.filter((exercise) => exercise._id !== action.payload.id);
      })
      .addCase(deleteExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetExercises } = exerciseSlice.actions;
export default exerciseSlice.reducer;
