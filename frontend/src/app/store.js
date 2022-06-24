import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import planReducer from "../features/plans/planSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    plans: planReducer,
  },
});
