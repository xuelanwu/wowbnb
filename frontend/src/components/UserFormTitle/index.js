import React from "react";
import "./index.css";

const UserFormTitle = ({ setShowModal }) => {
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <div className="form-modal-title-block">
      <div className="close-button-box">
        <button onClick={handleClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="form-modal-title-box">
        <h3>Log in or sign up</h3>
      </div>
    </div>
  );
};
export default UserFormTitle;
