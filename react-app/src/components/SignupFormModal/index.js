import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div className="signup-tarkov-form">
      <h1 className="signup-tarkov-title">Sign Up</h1>
      <form className="signup-tarkov-form__form" onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <ul className="signup-tarkov-form__errors">
            {errors.map((error, idx) => (
              <li key={idx} className="signup-tarkov-form__error-item">{error}</li>
            ))}
          </ul>
        )}
        <label className="signup-tarkov-form__label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-tarkov-form__input"
          />
        </label>
        <label className="signup-tarkov-form__label">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-tarkov-form__input"
          />
        </label>
        <label className="signup-tarkov-form__label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-tarkov-form__input"
          />
        </label>
        <label className="signup-tarkov-form__label">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="signup-tarkov-form__input"
          />
        </label>
        <button type="submit" className="signup-tarkov-form__button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
