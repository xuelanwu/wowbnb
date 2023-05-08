import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const SET_USER_BOOKINGS = "session/setUserBookings";

const setUser = (user) => {
  return { type: SET_USER, user };
};

const removeUser = () => {
  return { type: REMOVE_USER };
};

const setUserBookings = (bookings) => {
  return { type: SET_USER_BOOKINGS, bookings };
};

export const login = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify(user),
  });
  const data = await response.json();

  const { id, firstName, lastName, username, email } = data.user;
  dispatch(setUser({ id, firstName, lastName, username, email }));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  const { id, firstName, lastName, username, email } = data.user;
  dispatch(setUser({ id, firstName, lastName, username, email }));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

export const fetchUserBookings = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/current");
  const data = await response.json();

  dispatch(setUserBookings(data.Bookings));
  return response;
};

const initialState = { user: null, bookings: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = { ...state };
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      return initialState;
    case SET_USER_BOOKINGS:
      newState = { ...state };
      let newBookings = {};
      action.bookings.forEach((booking) => {
        newBookings[booking.id] = booking;
      });
      newState.bookings = { ...newBookings };
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
