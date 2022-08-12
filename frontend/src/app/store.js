import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import planReducer from "../features/plans/planSlice";
import planDraftReducer from "../features/plans/planDraftSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    plans: planReducer,
    planDraft: planDraftReducer,
  },
});
