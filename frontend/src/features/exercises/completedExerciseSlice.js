import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  exercises: [],
  isWorkoutStarted: false,
};

export const completedExerciseSlice = createSlice({
  name: "completedExercises",
  initialState,
  reducers: {
    resetExercises: (state) => initialState,
    addExercises: (state, action) => {
      state.exercises = action.payload;
    },
    setExerciseCompleted: (state, action) => {
      state.isWorkoutStarted = true;
      state.exercises.forEach((el) => {
        if (el.exercise === action.payload) el.isCompleted = true;
      });
    },
  },
});

export const {
  resetExercises,
  addExercises,
  setExerciseCompleted,
} = completedExerciseSlice.actions;

export default completedExerciseSlice.reducer;
