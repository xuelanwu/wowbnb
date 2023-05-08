import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect } from "react-router-dom";
import UserFormTitle from "../UserFormTitle";
import "./index.css";

const LoginForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (user) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    setErrors([]);
    return dispatch(login({ credential, password }))
      .then(() => {
        setShowModal(false);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
  const handleClick = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    setErrors([]);
    return dispatch(login({ credential: "FakeUser1", password: "password1" }))
      .then(() => {
        setShowModal(false);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="signup-login-form">
      <UserFormTitle setShowModal={setShowModal} />
      <div className="form-modal-welcome-block">
        <h2>Welcome Back!</h2>
      </div>
      <div className="form-modal-error-block">
        <ul>
          {errors.map((error, idx) => (
            <li key={`loginError-${idx + 1}`}>{error}</li>
          ))}
        </ul>
      </div>
      <div className="form-modal-block">
        <label htmlFor="credential">Username or Email</label>
        <input
          name="credential"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </div>
      <div className="form-modal-block">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="form-modal-block form-submit-button-block">
        <button type="submit" className="form-submit-button">
          Log In
        </button>
      </div>
      <div className="form-modal-block form-submit-button-block">
        <button className="form-submit-button" onClick={handleClick}>
          Demo User
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
