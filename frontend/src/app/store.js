import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import exerciseReducer from "../features/exercises/exerciseSlice";
import chosenExerciseReducer from "../features/exercises/exerciseToChangeSlice";
import planReducer from "../features/plans/planSlice";
import chosenPlanReducer from "../features/plans/planToChangeSlice";
import chosenSplitReducer from "../features/plans/chosenSplit";
import completedExerciseReducer from "../features/exercises/completedExerciseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exercises: exerciseReducer,
    chosenExercise: chosenExerciseReducer,
    plans: planReducer,
    chosenPlan: chosenPlanReducer,
    chosenSplit: chosenSplitReducer,
    completedExercises: completedExerciseReducer,
  },
});
