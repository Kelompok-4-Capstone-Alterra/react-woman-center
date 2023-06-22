import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
};

export const articleSlice = createSlice({
  name: "Article Slice",
  initialState,
  reducers: {
    addArticle(state, action) {},
    updateArticle(state, action) {
      state.articles = action.payload;
    },
    deleteArticle(state, action) {},
  },
});

export const { addArticle, updateArticle, deleteArticle } = articleSlice.actions;

export default articleSlice.reducer;
