import { configureStore } from "@reduxjs/toolkit";
import careerReducer from "../features/career/careerSlice";
import articleReducer from "../features/article/articleSlice";
import commentReducer from "../features/article/commentSlice";
import forumReducer from "../features/forum/forumSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    careerReducer,
    articleReducer,
    commentReducer,
    forumReducer,
    authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
