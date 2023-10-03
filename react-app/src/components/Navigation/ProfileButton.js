import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link } from 'react-router-dom'; 
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="profile-container">
      <button onClick={openMenu} className="burger-button">
        <div className="burger-line"></div>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="profile-username">{user.username}</li>
            <li className="profile-email">{user.email}</li>
            
            {/* Added your "Create a New Listing" button here */}
            {user.role === 'manager' && (
              <li className="profile-create-listing">
                <Link to="/create-listing">
                  <button>Create a New Listing</button>
                </Link>
              </li>
            )}
            
            <li className="profile-logout">
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <div className="login-btn-container">
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className="signup-btn-container">
              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
