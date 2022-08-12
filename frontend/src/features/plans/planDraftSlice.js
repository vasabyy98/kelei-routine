import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  routineType: "",
  volume: 0,
  massUnit: "kg",
  fullbodyExercises: [],
  upperSplitExercises: [],
  lowerSplitExercises: [],
  pushDayExercises: [],
  pullDayExercises: [],
  legsDayExercises: [],
};

export const planDraftSlice = createSlice({
  name: "planDraft",
  initialState: initialState,
  reducers: {
    resetDraft: (state) => initialState,
    resetAllExercises: (state) => {
      state.fullbodyExercises = [];
      state.upperSplitExercises = [];
      state.lowerSplitExercises = [];
    },
    setRoutine: (state, action) => {
      state.routineType = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setUnit: (state, action) => {
      state.massUnit = action.payload;
    },
    setFullbodyExercises: (state, action) => {
      state.fullbodyExercises = action.payload;
    },
    setUpperSplitExercises: (state, action) => {
      state.upperSplitExercises = action.payload;
    },
    setLowerSplitExercises: (state, action) => {
      state.lowerSplitExercises = action.payload;
    },
    setPushDayExercises: (state, action) => {
      state.pushDayExercises = action.payload;
    },
    setPullDayExercises: (state, action) => {
      state.pullDayExercises = action.payload;
    },
    setLegsDayExercises: (state, action) => {
      state.legsDayExercises = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const {
  setRoutine,
  setVolume,
  setUnit,
  setFullbodyExercises,
  setUpperSplitExercises,
  setLowerSplitExercises,
  setPushDayExercises,
  setPullDayExercises,
  setLegsDayExercises,
  setName,
  resetDraft,
  resetAllExercises,
} = planDraftSlice.actions;

export default planDraftSlice.reducer;
