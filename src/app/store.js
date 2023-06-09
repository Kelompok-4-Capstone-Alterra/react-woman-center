import { configureStore } from "@reduxjs/toolkit";
import careerReducer from "../features/career/careerSlice";

export const store = configureStore({
  reducer: {
    career: careerReducer,
  },
});
