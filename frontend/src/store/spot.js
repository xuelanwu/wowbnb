import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_SPOT_DETAIL = "spot/getSpotDetail";
const CREATE_SPOT = "spot/createSpot";
const EDIT_SPOT = "spot/editSpot";
const DELETE_SPOT = "spot/deleteSpot";
const ADD_SPOT_IMAGE = "spot/addSpotImage";

const getAllSpots = (spots) => {
  return { type: GET_ALL_SPOTS, spots };
};
const getSpotDetail = (spot) => {
  return { type: GET_SPOT_DETAIL, spot };
};
const createSpot = (spot) => {
  return { type: CREATE_SPOT, spot };
};
const editSpot = (spot) => {
  return { type: EDIT_SPOT, spot };
};
const deleteSpot = (id) => {
  return { type: DELETE_SPOT, id };
};
const addSpotImage = (spotId, img) => {
  return { type: ADD_SPOT_IMAGE, spotId, img };
};

export const fetchAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const data = await response.json();
  dispatch(getAllSpots(data.Spots));
  return response;
};

export const fetchFilteredSpots =
  ({ minPrice, maxPrice, city, state, country }) =>
  async (dispatch) => {
    const searchParams = new URLSearchParams({
      minPrice,
      maxPrice,
      city,
      state,
      country,
    });
    const response = await csrfFetch(`/api/spots?${searchParams.toString()}`);
    const data = await response.json();
    dispatch(getAllSpots(data.Spots));
    return response;
  };

export const fetchCreateSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const data = await response.json();
    const { id, address, city, state, country, name, description, price } =
      data;
    dispatch(
      createSpot({
        id,
        address,
        city,
        state,
        country,
        name,
        description,
        price,
      })
    );
    return data;
  }
  return response;
};
export const fetchEditSpot = (spotId, spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const data = await response.json();
    const { id, address, city, state, country, name, description, price } =
      data;
    dispatch(
      editSpot({ id, address, city, state, country, name, description, price })
    );
    return data;
  }
  return response;
};
export const fetchDeletespot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  dispatch(deleteSpot(spotId));
  return response;
};

export const fetchSpotDetail = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const data = await response.json();

  dispatch(getSpotDetail(data));
  return response;
};

export const fetchCreateSpotImage = (spotId, img) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify(img),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addSpotImage(spotId, data));
    return data;
  }
  return response;
};

const initialState = { spots: null };

const spotReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = {};
      if (Array.isArray(action.spots)) {
        action.spots.forEach((spot) => {
          newState[spot.id] = spot;
        });
        return newState;
      } else return null;
    case GET_SPOT_DETAIL:
      newState[action.spot.id] = action.spot;
      return newState;
    case CREATE_SPOT:
      newState[action.spot.id] = action.spot;
      return newState;
    case EDIT_SPOT:
      const newSpot = { ...state[action.spot.id] };
      Object.keys(action.spot).forEach((key) => {
        newSpot[key] = action.spot[key];
      });
      return { [action.spot.id]: newSpot };
    case DELETE_SPOT:
      delete newState[action.id];
      return newState;
    case ADD_SPOT_IMAGE:
      newState[action.spotId].previewImage = action.img.url;
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
