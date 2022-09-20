import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  user: "",
  name: "",
  routine: "",
  volume: 0,
  massUnit: "",
  fullbody: [],
  pushDay: [],
  pullDay: [],
  legsDay: [],
  upperSplit: [],
  lowerSplit: [],
  selectedWorkout: "",
};

export const selectedPlanSlice = createSlice({
  name: "selectedPlan",
  initialState: initialState,
  reducers: {
    resetSelectedPlan: (state) => initialState,
    setSelectedPlan: (state, action) => {
      state._id = action.payload._id;
      state.user = action.payload.user;
      state.name = action.payload.name;
      state.routine = action.payload.routine;
      state.volume = action.payload.volume;
      state.massUnit = action.payload.massUnit;
      state.fullbody = action.payload.fullbody;
      state.pushDay = action.payload.pushDay;
      state.pullDay = action.payload.pullDay;
      state.legsDay = action.payload.legsDay;
      state.upperSplit = action.payload.upperSplit;
      state.lowerSplit = action.payload.lowerSplit;
    },
    setSelectedWorkout: (state, action) => {
      state.selectedWorkout = action.payload;
    },
  },
});

export const { setSelectedPlan, setSelectedWorkout, resetSelectedPlan } = selectedPlanSlice.actions;

export default selectedPlanSlice.reducer;
