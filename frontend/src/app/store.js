import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import exerciseReducer from "../features/exercises/exerciseSlice";
import chosenExerciseReducer from "../features/exercises/exerciseToChangeSlice";
import planReducer from "../features/plans/planSlice";
import chosenPlanReducer from "../features/plans/planToChangeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exercises: exerciseReducer,
    chosenExercise: chosenExerciseReducer,
    plans: planReducer,
    chosenPlan: chosenPlanReducer,
  },
});
