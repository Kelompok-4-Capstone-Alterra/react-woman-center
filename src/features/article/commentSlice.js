import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
};

export const commentSlice = createSlice({
  name: 'Comment Slice',
  initialState,
  reducers: {
    updateComments(state, action) {
      state.comments = action.payload;
    },
    deleteComment(state, action) {},
  },
});

export const { deleteComment, updateComments } = commentSlice.actions;

export default commentSlice.reducer;
