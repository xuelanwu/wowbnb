import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserBookings } from "../../store/session";
import { fetchDeleteSpotBooking } from "../../store/booking";

import DeleteModal from "../DeleteModal";

import "./index.css";

const UserHomeList = ({ name, items }) => {
  const dispatch = useDispatch();

  return (
    <div className="user-home-list-container">
      <h2>{name}</h2>
      {name === "Bookings" ? (
        <ul className="user-home-list bookings">
          {items &&
            items.map((booking) => (
              <li
                className="user-home-list-items"
                key={`booking-${booking.id}`}
              >
                <div className="user-home-list-items-inner">
                  <div className="list-item-booking img">
                    <img src={booking.Spot.previewImage}></img>
                  </div>
                  <div className="list-item-booking dates">
                    <p className="user-booking-date">{`Check-In: ${booking.startDate}`}</p>
                    <p className="user-booking-date">{`Checkout: ${booking.endDate}`}</p>
                  </div>
                  <div className="list-item-booking button">
                    <DeleteModal name={"booking"} bookingId={booking.id} />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <ul className="user-home-list reviews"></ul>
      )}
    </div>
  );
};

export default UserHomeList;
