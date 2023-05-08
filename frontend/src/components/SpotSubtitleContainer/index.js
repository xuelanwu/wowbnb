import React from "react";
import "./index.css";
import avatar from "../../user.png";

const SpotSubtitleContainer = ({ spot }) => {
  return (
    <div className="spot-subtitle-container">
      <div className="subtitle-box">
        <div className="host-box">
          <h3>{`Entire villa hosted by ${spot.Owner &&
            spot.Owner.firstName}`}</h3>
        </div>
        <div className="lsting-detail-box">
          <span>10 guests · 5 bedrooms · 5 beds · 3 baths</span>
        </div>
      </div>
      <div className="avatar-box">
        <img src={avatar} alt="avatar" />
      </div>
    </div>
  );
};

export default SpotSubtitleContainer;
