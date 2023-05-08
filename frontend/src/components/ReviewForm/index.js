import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchCreateSpotReview } from "../../store/review";
import { useParams } from "react-router-dom";

import "./index.css";

const ReviewForm = ({ setShowModal }) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const [stars, setStars] = useState("");
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!stars) {
      const newError = ["Please rate this spot!"];
      setErrors(newError);
      return;
    }
    setErrors([]);
    return dispatch(fetchCreateSpotReview(spotId, { stars, review }))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setStars(e.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-modal-title-block">
        <div className="close-button-box">
          <button onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="form-modal-title-box">
          <h3>Write A Review</h3>
        </div>
      </div>
      <div className="form-modal-error-block">
        <ul>
          {errors.map((error, idx) => (
            <li key={`editSpotError-${idx + 1}`}>{error}</li>
          ))}
        </ul>
      </div>
      <div className="review-stars-block">
        <button className="stars-button" onClick={handleClick} value={1}>
          <i
            className={`fa-lg fa-star ${
              stars >= 1 ? "fa-solid" : "fa-regular"
            }`}
          ></i>
        </button>
        <button className="stars-button" onClick={handleClick} value={2}>
          <i
            className={`fa-lg fa-star ${
              stars >= 2 ? "fa-solid" : "fa-regular"
            }`}
          ></i>
        </button>
        <button className="stars-button" onClick={handleClick} value={3}>
          <i
            className={`fa-lg fa-star ${
              stars >= 3 ? "fa-solid" : "fa-regular"
            }`}
          ></i>
        </button>
        <button className="stars-button" onClick={handleClick} value={4}>
          <i
            className={`fa-lg fa-star ${
              stars >= 4 ? "fa-solid" : "fa-regular"
            }`}
          ></i>
        </button>
        <button className="stars-button" onClick={handleClick} value={5}>
          <i
            className={`fa-lg fa-star ${
              stars >= 5 ? "fa-solid" : "fa-regular"
            }`}
          ></i>
        </button>
      </div>
      <div className="form-modal-block">
        <textarea
          rows={5}
          maxLength={255}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
      </div>
      <div className="form-modal-block form-submit-button-block">
        <button type="submit" className="form-submit-button">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
