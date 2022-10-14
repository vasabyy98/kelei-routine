import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  split: "",
  exercise: "",
};

export const chosenSplitSlice = createSlice({
  name: "chosenSplit",
  initialState,
  reducers: {
    resetSplit: (state) => initialState,
    setSplit: (state, action) => {
      state.split = action.payload;
    },
    setExercise: (state, action) => {
      state.exercise = action.payload;
    },
  },
});

export const { resetSplit, setSplit, setExercise } = chosenSplitSlice.actions;

export default chosenSplitSlice.reducer;
