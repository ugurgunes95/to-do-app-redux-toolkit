import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  let navigate = useNavigate();

  const canGo = user.length >= 3;

  const saveUser = () => {
    localStorage.setItem("user", user);
    navigate("/home", { replace: true });
  };

  return (
    <div className="login-container px-5">
      <h3 className="text-center p-5 mb-5 ">Welcome</h3>
      <input
        type="text"
        className="form-control user"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Please write your name..."
      />
      <button
        className="btn btn-lg btn-block btn-secondary mt-5"
        disabled={!canGo}
        onClick={saveUser}
      >
        Continue
      </button>
    </div>
  );
};

export default Login;
