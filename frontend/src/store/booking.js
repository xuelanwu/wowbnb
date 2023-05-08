import { csrfFetch } from "./csrf";
import { fetchUserBookings } from "./session";

const GET_SPOT_BOOKING = "booking/getSpotBookings";
const CREATE_SPOT_BOOKING = "booking/createSpotBooking";
const DELETE_SPOT_BOOKING = "booking/deleteSpotBooking";

const getSpotBookings = (bookings) => {
  return { type: GET_SPOT_BOOKING, bookings };
};
const createSpotBooking = (booking) => {
  return { type: CREATE_SPOT_BOOKING, booking };
};
const deleteSpotBooking = (bookingId) => {
  return { type: DELETE_SPOT_BOOKING, bookingId };
};

export const fetchSpotBookings = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  const data = await response.json();
  dispatch(getSpotBookings(data.Bookings));
  return response;
};
export const fetchCreateSpotBooking =
  (spotId, startDate, endDate) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
      method: "POST",
      body: JSON.stringify({ startDate, endDate }),
    });

    dispatch(fetchSpotBookings(spotId));
    return response;
  };
export const fetchDeleteSpotBooking = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  dispatch(deleteSpotBooking(bookingId));
  dispatch(fetchUserBookings());
  return response;
};

const initialState = {};

const bookingReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_SPOT_BOOKING:
      newState = {};
      action.bookings.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return newState;
    case DELETE_SPOT_BOOKING:
      delete newState[action.bookingId];
      return newState;
    default:
      return state;
  }
};

export default bookingReducer;
