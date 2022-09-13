import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/home/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
