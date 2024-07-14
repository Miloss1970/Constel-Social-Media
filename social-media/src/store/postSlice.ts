import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Post } from "../models/models";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [] as Post[],
    singlePost: {} as Post,
  },

  reducers: {
    storeAllPosts: (state, actions) => {
      state.posts = actions.payload;
    },

    storeSinglePost: (state, actions) => {
      state.singlePost = actions.payload;
    },
    likePost: (state, action) => {
      const postId = action.payload;
      const postToUpdate = state.posts.find((post) => post.post_id === postId);

      if (!postToUpdate) return;
      postToUpdate.likes++;
      postToUpdate.liked = true;
    },
    unLike: (state, action) => {
      const postId = action.payload;
      console.log(postId);
      const postToUpdate = state.posts.find((post) => post.post_id === postId);

      if (postToUpdate && postToUpdate.likes > 0) {
        postToUpdate.likes--;
        postToUpdate.liked = false;
      }
    },

    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    removePost(state, action) {
      const postId = action.payload;

      const indexToUpdate = state.posts.findIndex((p) => p.post_id == postId);

      if (indexToUpdate !== -1) {
        state.posts.splice(indexToUpdate, 1);
      }
    },
    icrementComment: (state, actions) => {
      const postId = actions.payload;
      const postToUpdate = state.posts.find((post) => post.post_id === postId);

      if (!postToUpdate) return;
      postToUpdate.comments++;
    },

    decrementComment: (state, actions) => {
      const postId = actions.payload;
      const postToUpdate = state.posts.find((post) => post.post_id === postId);

      if (!postToUpdate) return;
      postToUpdate.comments--;
    },
  },
});
export const getAllPosts = (state: RootState) => {
  return state.postStore.posts;
};

export const getSinglePost = (state: RootState) => {
  return state.postStore.singlePost;
};
export const {
  storeAllPosts,
  likePost,
  unLike,
  addPost,
  removePost,
  storeSinglePost,
  icrementComment,
  decrementComment,
} = postSlice.actions;
export default postSlice.reducer;
