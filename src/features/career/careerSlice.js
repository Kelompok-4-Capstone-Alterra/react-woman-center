import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  careers: [],
};

export const careerSlice = createSlice({
  name: "Career Slice",
  initialState,
  reducers: {
    addCareer(state, action) {},
    updateCareer(state, action) {
      state.careers = action.payload;
    },
    deleteCareer(state, action) {},
  },
});

export const { addCareer, updateCareer, deleteCareer } = careerSlice.actions;

export default careerSlice.reducer;
