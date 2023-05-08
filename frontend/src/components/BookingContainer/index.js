import "react-dates/initialize";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from "react-dates";
import Moment from "moment";
import { extendMoment } from "moment-range";

import "react-dates/lib/css/_datepicker.css";
import "./react_dates_overrides.css";

import "./index.css";
import { useState } from "react";
import InputArrow from "./InputArrow";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateSpotBooking } from "../../store/booking";
import { useHistory } from "react-router-dom";

const BookingContainer = ({
  user,
  spot,
  avgRating,
  reviewList,
  bookingList,
}) => {
  const moment = extendMoment(Moment);
  const dispatch = useDispatch();
  const history = useHistory();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleBook = () => {
    const start = startDate.format("YYYY-MM-DD");
    const end = endDate.format("YYYY-MM-DD");
    return dispatch(fetchCreateSpotBooking(spot.id, start, end)).then(() =>
      history.push("/user/bookings")
    );
  };

  const isBlocked = (date) => {
    let bookedRanges = [];
    let blocked = [];

    bookingList.map((booking) => {
      // const start = moment(booking.startDate, "YYYY-MM-DD");
      // const end = moment(booking.endDate, "YYYY-MM-DD");
      // const range = moment.range(start, end);
      bookedRanges = [
        ...bookedRanges,
        moment.range(booking.startDate, booking.endDate),
      ];
    });

    blocked = bookedRanges.find((range) => {
      return range.contains(date);
    });
    return blocked;
  };

  return (
    <div className="booking-container">
      <div className="booking-price-block">
        <div className="booking-price-left">
          <h2>
            {`$${spot.price}`}
            <span> night</span>
          </h2>
        </div>
        <div className="booking-price-right">
          <i className="fa-solid fa-star fa-sm"></i>
          {reviewList.length > 0 ? (
            <span>
              <span className="booking-avg">{`${avgRating}`} · </span>
              <span className="booking-reviews">{`${reviewList.length} reviews`}</span>
            </span>
          ) : (
            <span>New</span>
          )}
        </div>
      </div>
      <div className="booking-date-block">
        <div
          className="calendar-label DateRangePicker"
          style={{ display: "flex", alignItems: "flex-end", height: "1.5rem" }}
        >
          <div className="calendar-label-box DateInput_input">CHECK-IN</div>
          <InputArrow />
          <div className="calendar-label-box DateInput_input">CHECKOUT</div>
        </div>
        <DateRangePicker
          startDate={startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
          }}
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
          startDatePlaceholderText="Add Date"
          endDatePlaceholderText="Add Date"
          customArrowIcon={<InputArrow />}
          noBorder
          verticalSpacing={0}
          horizontalMargin={65}
          minimumNights={1}
          isDayBlocked={isBlocked}
        />
      </div>
      {user && spot.ownerId === user.id ? (
        <div className="booking-button-block">
          <button onClick={handleBook} disabled>
            Check avaliablity
          </button>
        </div>
      ) : user ? (
        <div className="booking-button-block">
          <button onClick={handleBook}>Check avaliablity</button>
        </div>
      ) : (
        <div className="booking-button-block" disabled>
          <button onClick={handleBook}>Login First</button>
        </div>
      )}

      <div className="booking-sum-block">
        {startDate && endDate && <div className="booking-nights-box"></div>}
      </div>
    </div>
  );
};

export default BookingContainer;
