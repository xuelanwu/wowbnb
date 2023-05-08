import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { logout } from "../../store/session";

import CreateSpotModal from "../Navigation/CreateSpotModal";
import "./index.css";

const ProfileButton = ({ user, setLogin, setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => history.push("/"));
  };

  const handleBookings = (e) => {
    e.preventDefault();
    history.push("/user/bookings");
  };

  return (
    <div className="profile-dropdown-container">
      <button className="profile-dropdown-menu-button" onClick={openMenu}>
        <div className="profile-menu-icon">
          <i className="fa-solid fa-bars fa-lg"></i>
        </div>
        <div className="profile-avatar-icon">
          <i className="fa-solid fa-user fa-lg"></i>
        </div>
      </button>
      {showMenu &&
        (user ? (
          <ul className="profile-dropdown-menu-container">
            <li>
              <h3>{`Hello, ${user.firstName}.`}</h3>
            </li>
            <li>{user.email}</li>
            <li
              className={`profile-dropdown-menu-button-box ${
                path === "/user/bookings" && "user-home-dropdown-button-box"
              }`}
            >
              <button
                onClick={handleBookings}
                className={`profile-dropdown-button`}
              >
                My Bookings
              </button>
            </li>
            <li className="profile-dropdown-menu-button-box">
              <button
                className="profile-dropdown-button wishlist disabled"
                disabled
              >
                My Wishlist
              </button>
            </li>
            <li className="profile-dropdown-menu-button-box">
              <button
                onClick={handleLogout}
                className="profile-dropdown-button"
              >
                Log Out
              </button>
            </li>
          </ul>
        ) : (
          <ul className="profile-dropdown-menu-container">
            <li className="profile-dropdown-menu-button-box">
              <button
                className="profile-dropdown-button signup"
                onClick={() => {
                  setLogin(false);
                  setShowModal(true);
                }}
              >
                Sign Up
              </button>
            </li>
            <li className="profile-dropdown-menu-button-box">
              <button
                className="profile-dropdown-button login"
                onClick={() => {
                  setLogin(true);
                  setShowModal(true);
                }}
              >
                Log In
              </button>
            </li>
            <li className="profile-dropdown-menu-divider"></li>
            <li className="profile-dropdown-menu-button-box">
              <button
                className="profile-dropdown-button login"
                onClick={() => {
                  setLogin(true);
                  setShowModal(true);
                }}
              >
                Airbnb your home
              </button>
            </li>
            <li className="profile-dropdown-menu-button-box">
              <button
                className="profile-dropdown-button experience disabled"
                disabled
              >
                Host your experience
              </button>
            </li>
            <li className="profile-dropdown-menu-button-box">
              <button
                className="profile-dropdown-button help disabled"
                disabled
              >
                help
              </button>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default ProfileButton;
