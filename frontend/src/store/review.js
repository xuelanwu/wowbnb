import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEW = "review/getSpotReviews";
const CREATE_SPOT_REVIEW = "review/createSpotReview";
const DELETE_SPOT_REVIEW = "review/deleteSpotReview";

const getSpotReviews = (reviews) => {
  return { type: GET_SPOT_REVIEW, reviews };
};
const createSpotReview = (review) => {
  return { type: CREATE_SPOT_REVIEW, review };
};
const deleteSpotReview = (reviewId) => {
  return { type: DELETE_SPOT_REVIEW, reviewId };
};

export const fetchSpotReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const data = await response.json();
  dispatch(getSpotReviews(data.Reviews));
  return response;
};
export const fetchCreateSpotReview = (spotId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
  });
  const data = await response.json();
  data.stars = parseInt(data.stars);
  dispatch(createSpotReview(data));
  return response;
};
export const fetchDeleteSpotReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  dispatch(deleteSpotReview(reviewId));
  return response;
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_SPOT_REVIEW:
      newState = {};
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case CREATE_SPOT_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case DELETE_SPOT_REVIEW:
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
