import React, { useEffect } from "react";
import Header from "../../components/Header";
import SingleTodo from "./SingleTodo";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllTodos,
  getTodosError,
  getTodosStatus,
  fetchTodos,
} from "./todosSlice";
import NewTodoIcon from "./NewTodoIcon";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectAllTodos);
  const status = useSelector(getTodosStatus);
  const error = useSelector(getTodosError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  let content;

  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (status === "succeeded") {
    content = todos.map((todo) => <SingleTodo todo={todo} key={todo.id} />);
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <>
      <Header />
      <section className="todos">
        <p className="text-center">
          <NewTodoIcon />
        </p>
        {content}
      </section>
    </>
  );
};

export default Todos;
