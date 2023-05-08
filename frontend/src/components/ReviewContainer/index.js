import { useSelector } from "react-redux";

import DeleteModal from "../DeleteModal";
import CreateReviewModal from "../CreateReviewModal";
import "./index.css";
import avatar from "../../user.png";

const ReviewContainer = ({ ownerId, reviewList, avgRating }) => {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="review-container">
      {reviewList.length > 0 ? (
        <div className="review-block">
          <div className="overall-review-block">
            <span>
              <i className="fa-solid fa-star"></i>
              <span className="avg-star-span">{avgRating}</span>
              <span> · </span>
              <span className="num-reviews-span">{`${reviewList.length} reviews`}</span>
            </span>

            <div className="create-review-button-box">
              {user &&
                user.id !== ownerId &&
                (reviewList.length < 1 ? (
                  <CreateReviewModal />
                ) : reviewList.find(
                    (review) => review.userId === user.id
                  ) ? null : (
                  <CreateReviewModal />
                ))}
            </div>
          </div>
          <div className="review-content-block">
            {reviewList.map((review) => {
              const date = new Date(review.createdAt);
              const formattedDate = date.toDateString().split(" ");
              return (
                <div key={`review-${review.id}`} className="review-box">
                  <div className="review-title-container">
                    <div className="review-name-container">
                      <div className="avatar-box">
                        <img src={avatar} alt="avatar" width="3rem" />
                      </div>
                      <div className="review-name-block">
                        <div className="review-name-box review-text">
                          <p>
                            {(review.User && review.User.firstName) ||
                              user.firstName}
                          </p>
                        </div>
                        <div className="review-date-box review-text">
                          <p>{`${formattedDate[1]} ${formattedDate[3]}`}</p>
                        </div>
                      </div>
                    </div>
                    <div className="review-delete-box">
                      {user && user.id === review.userId && (
                        <DeleteModal name={"review"} reviewId={review.id} />
                      )}
                    </div>
                  </div>

                  <div className="review-content-box review-text">
                    <p>{review.review}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="overall-review-block">
          <span className="no-review-span">{`No review (yet)`}</span>
          <div className="create-review-button-box">
            {user &&
              user.id !== ownerId &&
              (reviewList.length < 1 ? (
                <CreateReviewModal />
              ) : reviewList.find(
                  (review) => review.userId === user.id
                ) ? null : (
                <CreateReviewModal />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewContainer;
