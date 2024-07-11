import { createSlice } from "@reduxjs/toolkit";
import { Comment } from "../models/models";
const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [] as Comment[],
  },

  reducers: {
    storeAllComments: (state, actions) => {
      state.comments = actions.payload;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },

    removeComment(state, action) {
      const commentId = action.payload;

      const indexToUpdate = state.comments.findIndex(
        (p) => p.comment_id == commentId
      );

      if (indexToUpdate !== -1) {
        state.comments.splice(indexToUpdate, 1);
      }
    },
  },
});
export const getAllComments = (state: any) => {
  return state.commentStore.comments;
};

export const { storeAllComments, addComment, removeComment } =
  commentSlice.actions;
export default commentSlice.reducer;
