import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch } from "react-redux";
import { editTodo } from "./todosSlice";

const EditTodo = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { todo } = state;
  const [updated, setUpdated] = useState(todo?.content);
  let navigate = useNavigate();

  let editedTodo = {
    id: todo.id,
    content: updated,
    isCompleted: todo.isCompleted,
  };

  const canSave = updated.length > 3;

  return todo ? (
    <div className="edit-container p-5 bg-dark">
      <h3 className="text-center my-4">Edit ToDo</h3>
      <textarea
        className=""
        placeholder="Please write at least 3 letters."
        value={updated}
        onChange={(e) => setUpdated(e.target.value)}
        minLength="3"
      ></textarea>
      <button
        className="btn btn-outline-light btn-block mt-3"
        onClick={() => navigate("/home", { replace: true })}
      >
        Cancel
      </button>
      <button
        className="btn btn-success btn-block mt-2"
        disabled={!canSave}
        onClick={() => {
          dispatch(editTodo(editedTodo));
          navigate("/home", { replace: true });
        }}
      >
        Save
      </button>
    </div>
  ) : (
    <p className="text-center">You should choose an item to edit.</p>
  );
};

export default EditTodo;
