import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forums: [],
};

export const forumSlice = createSlice({
  name: "Forum Slice",
  initialState,
  reducers: {
    updateForum(state, action) {
      state.forums = action.payload;
    },
    deleteForum(state, action) {},
  },
});

export const { updateForum, deleteForum } = forumSlice.actions;

export default forumSlice.reducer;
