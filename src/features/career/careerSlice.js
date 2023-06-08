import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  careers: [],
};

export const careerSlice = createSlice({
  name: "Career Slice",
  initialState,
  reducers: {
    updateCareers: (state, action) => {
      state.careers = action.payload;
    },
  },
});

export const { updateCareers } = careerSlice.actions;

export default careerSlice.reducer;
