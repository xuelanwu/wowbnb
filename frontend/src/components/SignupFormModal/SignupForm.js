import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/session";
import { Redirect } from "react-router-dom";
import UserFormTitle from "../UserFormTitle";
import "./index.css";

const SignupForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (user) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        signup({ firstName, lastName, username, email, password })
      )
        .then(() => setShowModal(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <form onSubmit={handleSubmit} className="signup-login-form">
      <UserFormTitle setShowModal={setShowModal} />
      <div className="form-modal-welcome-block">
        <h2>Welcome to WhateverBnb</h2>
      </div>
      <div className="form-modal-error-block">
        <ul>
          {errors.map((error, idx) => (
            <li key={`loginError-${idx + 1}`}>{error}</li>
          ))}
        </ul>
      </div>
      <div className="form-modal-block">
        <label htmlFor="firstName">First Name</label>
        <input
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="form-modal-block">
        <label htmlFor="lastName">Last Name</label>
        <input
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="form-modal-block">
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-modal-block">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <div className="form-modal-block">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-modal-block form-submit-button-block">
        <button type="submit" className="form-submit-button">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
