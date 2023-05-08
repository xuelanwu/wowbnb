import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserBookings } from "../../store/session";
import UserHomeList from "../UserHomeList";

import "./index.css";

const UserBookingsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  //   const reviews = useSelector((state) => state.reviews);
  //   const reviewList = Object.values(reviews);
  const bookings = useSelector((state) => state.session.bookings);

  //   const bookingList = Object.values(bookings);
  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  if (!user) return null;
  return (
    <div className="user-home-container">
      <UserHomeList
        name={"Bookings"}
        items={bookings ? Object.values(bookings) : null}
      />
    </div>
  );
};

export default UserBookingsPage;
