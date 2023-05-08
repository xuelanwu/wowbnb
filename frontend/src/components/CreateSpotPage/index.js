import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchCreateSpot, fetchCreateSpotImage } from "../../store/spot";
import { useHistory } from "react-router-dom";
import "./index.css";

const CreateSpotPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const spot = {
      address,
      city,
      state,
      country,
      lat: 37.7645358,
      lng: -122.4730327,
      name,
      description,
      price,
    };
    return (
      dispatch(fetchCreateSpot(spot))
        .then((spot) => {
          dispatch(fetchCreateSpotImage(spot.id, { url: img, preview: true }));
          history.push(`/spots/${spot.id}`);
        })
        // .then(() => {
        //   setShowModal(false);
        // })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        })
    );
  };
  return (
    <div className="create-spot-container">
      <div className="create-spot-form-title-block">
        <h2>WhateverBnb it.</h2>
      </div>
      <div className="form-modal-error-block">
        <ul>
          {errors.map((error, idx) => (
            <li key={`loginError-${idx + 1}`}>{error}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="create-spot-form">
        <div className="form-modal-block">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-modal-block">
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-modal-block">
          <label>State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="form-modal-block">
          <label>Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div className="form-modal-block">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-modal-block">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="1"
          />
        </div>
        <div className="form-modal-block">
          <label>Add an image url</label>
          <input
            placeholder="https://example.com"
            pattern="https://.*"
            type="url"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </div>
        <div className="form-modal-block">
          <label>Description</label>
          <textarea
            rows={5}
            maxLength={255}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-modal-block form-submit-button-block">
          <button type="submit" className="form-submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSpotPage;
