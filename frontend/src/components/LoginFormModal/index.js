// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  const handleClick = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <>
    <div className='wholeForm'>
      <h1 className="login-topText">Log In</h1>
      <form onSubmit={handleSubmit} className='inputs'>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="input">
        <label>
          Username or Email
        </label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            style={{backgroundColor: 'lightblue', height: '2em'}}
          />
        </div>
        <div className="input">
        <label>
          Password
        </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{backgroundColor: 'lightblue', height: '2em'}}
          />
        </div>
        <button type="submit" className="loginButton" disabled={credential.length < 4 || password.length < 6}>Log In</button>
        <button onClick={handleClick} className='demoUserButton'>Log In as Demo User</button>
      </form>
    </div>
    </>
  );
}

export default LoginFormModal;