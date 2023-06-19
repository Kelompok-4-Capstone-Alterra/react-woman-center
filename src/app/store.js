import { configureStore } from "@reduxjs/toolkit";
import careerReducer from "../features/career/careerSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    careerReducer,
    authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
