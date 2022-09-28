import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import exerciseReducer from "../features/exercises/exerciseSlice";
import chosenExerciseReducer from "../features/exercises/exerciseToChangeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exercises: exerciseReducer,
    chosenExercise: chosenExerciseReducer,
  },
});
