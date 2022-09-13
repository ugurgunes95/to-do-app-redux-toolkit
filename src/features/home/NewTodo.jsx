import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTodo } from "./todosSlice";

const NewTodo = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  let canSave = newTodo.length > 3;

  return (
    <div className="add-container p-5 bg-dark">
      <h3 className="text-center my-4">New ToDo</h3>
      <textarea
        className=""
        placeholder="Please write at least 3 letters."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
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
          dispatch(addTodo(newTodo));
          navigate("/home", { replace: true });
        }}
      >
        Add
      </button>
    </div>
  );
};

export default NewTodo;
