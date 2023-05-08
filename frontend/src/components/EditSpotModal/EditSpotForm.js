import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchEditSpot } from "../../store/spot";
import { useParams } from "react-router-dom";
import "./index.css";

const EditSpotForm = ({ setShowModal, spot }) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const [address, setAddress] = useState(spot.address || "");
  const [city, setCity] = useState(spot.city || "");
  const [state, setState] = useState(spot.state || "");
  const [country, setCountry] = useState(spot.country || "");
  const [name, setName] = useState(spot.name || "");
  const [description, setDescription] = useState(spot.description || "");
  const [price, setPrice] = useState(spot.price || "");
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
    return dispatch(fetchEditSpot(spotId, spot))
      .then(() => {
        setShowModal(false);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (!spot) return null;

  return (
    <form onSubmit={handleSubmit} className="edit-spot-form">
      <div className="form-modal-title-block">
        <div className="close-button-box">
          <button onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="form-modal-title-box">
          <h3>Edit Spot</h3>
        </div>
      </div>
      <div className="form-modal-error-block">
        <ul>
          {errors.map((error, idx) => (
            <li key={`editSpotError-${idx + 1}`}>{error}</li>
          ))}
        </ul>
      </div>
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
  );
};

export default EditSpotForm;
