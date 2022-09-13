import React from "react";
import DeleteIcon from "./DeleteIcon";
import DoneIcon from "./DoneIcon";
import EditIcon from "./EditIcon";

const SingleTodo = ({ todo }) => {
  return (
    <article
      className="todo text-center p-4 my-2"
      style={{ textDecoration: todo.isCompleted && "line-through" }}
    >
      {todo.content.length > 50
        ? `${todo.content.substring(0, 50)}...`
        : todo.content}
      <div className="text-center">
        <DoneIcon todo={todo} />
        <EditIcon todo={todo} />
        <DeleteIcon id={todo.id} />
      </div>
    </article>
  );
};

export default SingleTodo;
