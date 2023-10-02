import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  useEffect(() => {
    if (sessionUser) {
      closeModal();
      history.push('/'); // This will navigate to the homepage after a successful login
    }
  }, [sessionUser, closeModal, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemoUserLogin = async () => {
    await dispatch(login('demo@aa.io', 'password'));
  };

  const handleAdminLogin = async () => {
    await dispatch(login('admin@aa.io', 'securepassword'));
  };

  return (
    <>
      <div className="tarkov-form">
        <h1 className="tarkov-title">Log In</h1>
        <form className="tarkov-form__form" onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <ul className="tarkov-form__errors">
              {errors.map((error, idx) => (
                <li key={idx} className="tarkov-form__error-item">{error}</li>
              ))}
            </ul>
          )}
          <label className="tarkov-form__label">
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="tarkov-form__input"
            />
          </label>
          <label className="tarkov-form__label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="tarkov-form__input"
            />
          </label>
          <button type="submit" className="tarkov-form__button">Log In</button>
          <button type="button" onClick={handleDemoUserLogin} className="tarkov-form__button tarkov-form__button--demo">Login as Demo User</button>
          <button type="button" onClick={handleAdminLogin} className="tarkov-form__button tarkov-form__button--admin">Login as Admin</button>
        </form>
      </div>
    </>
  );
  
}

export default LoginFormModal;
