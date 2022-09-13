import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const TODOS_URL = "https://63120d5b19eb631f9d7ec061.mockapi.io/todos";
const initialState = { todos: [], status: "idle", error: null };

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(TODOS_URL);
  return response.data;
});

export const editTodo = createAsyncThunk("todos/editTodo", async (todo) => {
  const editedTodo = {
    id: todo.id,
    content: todo.content,
    isCompleted: todo.isCompleted,
  };
  await axios.put(`${TODOS_URL}/${todo.id}`, editedTodo);
});

export const completeTodo = createAsyncThunk(
  "todos/completeTodo",
  async (todo) => {
    const changedOne = {
      id: todo.id,
      content: todo.content,
      isCompleted: !todo.isCompleted,
    };
    await axios.put(`${TODOS_URL}/${todo.id}`, changedOne);
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${TODOS_URL}/${id}`);
});

export const addTodo = createAsyncThunk("todos/addTodo", async (content) => {
  const newTodo = { id: nanoid(), content: content, isCompleted: false };
  await axios.post(TODOS_URL, newTodo);
});

const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedTodos = action.payload.map((todo) => todo);
        state.todos = loadedTodos;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.status = "idle";
        fetchTodos();
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.status = "idle";
        fetchTodos();
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "idle";
        fetchTodos();
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "idle";
        fetchTodos();
      });
  },
});

export const selectAllTodos = (state) => state.todos.todos;
export const getTodosError = (state) => state.todos.error;
export const getTodosStatus = (state) => state.todos.status;

export default todosSlice.reducer;
