const express = require("express");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { requireAuth } = require("../../utils/auth");
const { User, Booking, Spot, SpotImage } = require("../../db/models");
const { Sequelize, Op } = require("sequelize");

const router = express.Router();

//Get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const bookings = await Booking.findAll({
    where: { userId },
    include: {
      model: Spot,
      attributes: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "price",
      ],
    },
  });

  if (bookings.length > 0) {
    for (let booking of bookings) {
      const previewImage = await SpotImage.findOne({
        where: { spotId: booking.dataValues.Spot.id, preview: true },
      });

      if (previewImage) {
        booking.dataValues.Spot.dataValues.previewImage =
          previewImage.dataValues.url;
      } else {
        booking.dataValues.Spot.dataValues.previewImage =
          "Let's add some photos!";
      }
    }
    return res.json({ Bookings: bookings });
  } else {
    return res.json({ Bookings: "Book now!" });
  }
});

//Edit a Booking
router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { bookingId } = req.params;
  const { startDate: newStartDateStr, endDate: newEndDateStr } = req.body;

  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    err.title = "Booking Not Found";
    err.errors = ["Booking couldn't be found"];
    return next(err);
  }

  if (userId !== booking.dataValues.userId) {
    const err = new Error("Booking must belong to the current user");
    err.status = 404;
    err.title = "Forbidden";
    err.errors = ["Booking must belong to the current user"];
    return next(err);
  }

  const { id, spotId, endDate: oldEndDateStr } = booking.dataValues;
  const today = new Date();
  const oldEndDate = new Date(oldEndDateStr);
  const newStartDate = new Date(newStartDateStr);
  const newEndDate = new Date(newEndDateStr);
  if (oldEndDate.getTime() <= today.getTime()) {
    const err = new Error("Past bookings can't be modified");
    err.status = 403;
    err.title = "Past Bookings";
    err.errors = ["Past bookings can't be modified"];
    return next(err);
  }
  if (newEndDate.getTime() <= today.getTime()) {
    const err = new Error("endDate cannot come before today");
    err.status = 403;
    err.title = "Invalid booking date";
    err.errors = ["endDate cannot come before today"];
    return next(err);
  }

  const bookings = await Booking.findAll({
    where: {
      spotId,
      id: {
        [Op.not]: id,
      },
    },
  });
  if (bookings.length) {
    for (let i = 0; i < bookings.length; i++) {
      const { startDate: bookedStartDateStr, endDate: bookedEndDateStr } =
        bookings[i].dataValues;
      const bookedStartDate = new Date(bookedStartDateStr);
      const bookedEndDate = new Date(bookedEndDateStr);

      if (
        !(
          (newStartDate.getTime() < bookedStartDate.getTime() &&
            newEndDate.getTime() <= bookedStartDate.getTime()) ||
          newStartDate.getTime() >= bookedEndDate.getTime()
        )
      ) {
        const err = new Error(
          "Sorry, this spot is already booked for the specified dates"
        );
        err.status = 403;
        err.title = "Booking Conflict";
        err.errors = [
          "Start date conflicts with an existing booking",
          "End date conflicts with an existing booking",
        ];
        return next(err);
      }
    }
  }

  const updatedBooking = await booking.update({
    startDate: newStartDateStr,
    endDate: newEndDateStr,
  });
  return res.json(updatedBooking);
});

//Delete a Booking
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { bookingId } = req.params;

  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    err.title = "Booking Not Found";
    err.errors = ["Booking couldn't be found"];
    return next(err);
  }

  if (userId !== booking.dataValues.userId) {
    const err = new Error("Booking must belong to the current user");
    err.status = 404;
    err.title = "Forbidden";
    err.errors = ["Booking must belong to the current user"];
    return next(err);
  }

  const { startDate: startDateStr } = booking.dataValues;
  const today = new Date();
  const formattedStartDate = new Date(startDateStr);
  if (formattedStartDate.getTime() <= today.getTime()) {
    const err = new Error("Past bookings can't be modified");
    err.status = 403;
    err.title = "Past Bookings";
    err.errors = ["Past bookings can't be modified"];
    return next(err);
  }

  await booking.destroy();
  res.status = 200;
  return res.json({
    message: `Successfully deleted bookingId:${bookingId}`,
    statusCode: 200,
  });
});

module.exports = router;
