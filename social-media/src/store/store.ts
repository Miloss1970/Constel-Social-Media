import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import commentSlice from "./commentSlice";

const rootReducer = combineReducers({
  postStore: postSlice,
  commentStore: commentSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
