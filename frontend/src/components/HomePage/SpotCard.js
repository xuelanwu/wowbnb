import React from "react";
import { NavLink } from "react-router-dom";

const SpotCard = ({ spot }) => {
  const today = new Date();
  const spotCreateDate = new Date(spot.createdAt);
  const weeks = Math.ceil((today - spotCreateDate) / 604800000);

  return (
    <NavLink to={`/spots/${spot.id}`} className="navlink-spot-card">
      <div className="spot-card">
        <div className="spot-card-image-box">
          {spot.previewImage !== "Let's add some photos!" && (
            <img src={spot.previewImage} alt={spot.name} />
          )}
        </div>
        <div className="spot-card-text-block">
          <div className="spot-card-city-box spot-card-text-box">
            <p>{`${spot.city},${spot.state}`}</p>
            <div className="spot-card-stars">
              <i className="fa-solid fa-star fa-xs"></i>
              {spot.avgRating ? (
                <span>{`${spot.avgRating}`}</span>
              ) : (
                <span>New</span>
              )}
            </div>
          </div>
          <div className="spot-card-added-time-box spot-card-text-box">
            {`Added ${weeks} ${weeks > 1 ? "weeks" : "week"} ago`}
          </div>
          <div className="spot-card-available-box spot-card-text-box">{`Nov 27 - Dec 1`}</div>
          <div className="spot-card-price-box spot-card-text-box">{`$${spot.price} night`}</div>
        </div>
      </div>
    </NavLink>
  );
};

export default SpotCard;
