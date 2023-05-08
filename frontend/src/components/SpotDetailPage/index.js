import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpotDetail } from "../../store/spot";
import { fetchSpotReviews } from "../../store/review";
import { fetchSpotBookings } from "../../store/booking";
import "./index.css";
import EditSpotModal from "../EditSpotModal";
import DeleteModal from "../DeleteModal";
import ReviewContainer from "../ReviewContainer";
import SpotDescriptionContainer from "../SpotDescriptionContainer";
import SpotSubtitleContainer from "../SpotSubtitleContainer";
import BookingContainer from "../BookingContainer";

const SpotDetailPage = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots[spotId]);
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews);
  const reviewList = Object.values(reviews);
  const bookings = useSelector((state) => state.bookings);
  const bookingList = Object.values(bookings);

  useEffect(() => {
    dispatch(fetchSpotDetail(spotId));
    dispatch(fetchSpotReviews(spotId));
    dispatch(fetchSpotBookings(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;
  if (!reviews) return;
  if (!bookings) return;

  const avgRating = (
    reviewList.reduce((sum, review) => sum + review.stars, 0) /
    reviewList.length
  ).toFixed(2);

  return (
    <div className="spot-detail-container">
      <div className="spot-name-block">
        <h1>{spot.name}</h1>
        {user && user.id === spot.ownerId && (
          <div className="edit-spot-button-box">
            <EditSpotModal spot={spot} />
            <DeleteModal name={"spot"} spotId={spotId} />
          </div>
        )}
      </div>
      <div className="spot-subtitle-block">
        <div className="spot-subtitle-block-left">
          <div className="subtitle-review-box">
            <i className="fa-solid fa-star fa-sm"></i>
            {reviewList.length > 0 ? (
              <span>
                <span>{`${avgRating}`} · </span>
                <span>{`${reviewList.length} reviews`}</span>
              </span>
            ) : (
              <span>New</span>
            )}
          </div>
          <div className="superhost-box">
            <span className="dot-span">·</span>
            <i className="fa-solid fa-medal"></i>
            <span>Superhost</span>
          </div>
          <div className="address-box">
            <span className="dot-span">·</span>
            <span>
              <span className="address-span">{spot.city}</span>,{" "}
              <span className="address-span">{spot.state}</span>,{" "}
              <span className="address-span">{spot.country}</span>
            </span>
          </div>
        </div>
        <div className="spot-subtitle-block-right">
          <div className="share-save-box">
            <span>
              <i className="fa-solid fa-arrow-up-from-bracket"></i>
              <span className="share-save-span">Share</span>
            </span>
          </div>
          <div className="share-save-box">
            <span>
              <i className="fa-regular fa-heart"></i>
              <span className="share-save-span">Save</span>
            </span>
          </div>
        </div>
      </div>

      <div className="spot-image-container">
        {spot.SpotImage &&
          (spot.SpotImage.length > 0 ? (
            <img src={spot.SpotImage[0].url} alt={spot.name} />
          ) : null)}
      </div>

      <div className="detail-content-container">
        <div className="detail-content-left">
          <SpotSubtitleContainer spot={spot} />
          <SpotDescriptionContainer spot={spot} />
          <ReviewContainer
            ownerId={spot.ownerId}
            spot={spot}
            reviewList={reviewList}
            avgRating={avgRating}
          />
        </div>
        <div className="detail-content-right">
          <BookingContainer
            spot={spot}
            avgRating={avgRating}
            reviewList={reviewList}
            bookingList={bookingList}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default SpotDetailPage;
