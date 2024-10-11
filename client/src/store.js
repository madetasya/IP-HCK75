import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../src/features/postSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
});
