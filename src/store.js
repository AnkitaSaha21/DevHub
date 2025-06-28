import { configureStore } from "@reduxjs/toolkit";
import developerReducer from "./features/developerSlice";
import blogReducer from "./features/blogSlice";
import commentReducer from "./features/commentSlice";
// import blogReducer from "../features/blogSlice";
// import commentReducer from "../features/commentSlice";

export const store = configureStore({
  reducer: {
    developers: developerReducer,
    blogs: blogReducer,
    comments: commentReducer,
  },
});
