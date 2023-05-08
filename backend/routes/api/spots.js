const express = require("express");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { requireAuth } = require("../../utils/auth");
const {
  User,
  Spot,
  Review,
  Booking,
  SpotImage,
  ReviewImage,
} = require("../../db/models");
const { Sequelize, Op } = require("sequelize");

const router = express.Router();

const getSpotReview = async (spot) => {
  let result = {};
  const spotReviews = await spot.getReviews({
    includes: { model: Review },
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("spotId")), "numReviews"],
      [
        Sequelize.fn("ROUND", Sequelize.fn("AVG", Sequelize.col("stars")), 2),
        "avgRating",
      ],
    ],
  });
  const { numReviews, avgRating } = spotReviews[0].dataValues;
  if (numReviews == 0) {
    result.numReviews = null;
    result.avgRating = null;
  } else {
    result.numReviews = numReviews;
    result.avgRating = avgRating;
  }
  return result;
};

const getSpotPreviewImage = async (spot) => {
  const previewImage = await SpotImage.findOne({
    where: { spotId: spot.id, preview: true },
  });

  if (previewImage) {
    return previewImage.dataValues.url;
  } else {
    return "Let's add some photos!";
  }
};

const handleAllSpotsReponse = async (spots) => {
  for (let spot of spots) {
    const { avgRating } = await getSpotReview(spot);
    spot.dataValues.avgRating = avgRating;

    const previewImageUrl = await getSpotPreviewImage(spot);
    spot.dataValues.previewImage = previewImageUrl;
  }
  return spots;
};

//Get all spots
router.get("/", async (req, res, next) => {
  let query = {};
  let where = {};
  let {
    page,
    size,
    minLat,
    maxLat,
    minLng,
    maxLng,
    minPrice,
    maxPrice,
    city,
    state,
    country,
  } = req.query;

  if (city) {
    const lowerCity = city.toLowerCase();
    where.city = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("city")),
      "LIKE",
      "%" + lowerCity + "%"
    );
  }
  if (state) {
    const lowerState = state.toLowerCase();
    where.state = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("state")),
      "LIKE",
      "%" + lowerState + "%"
    );
  }
  if (country) {
    const lowerCountry = country.toLowerCase();
    where.country = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("country")),
      "LIKE",
      "%" + lowerCountry + "%"
    );
  }

  if (page) page = parseInt(page);
  if (size) size = parseInt(size);
  if (page > 10) page = 10;
  if (size > 20) size = 20;
  if (page >= 1 && size >= 1) {
    query.limit = size;
    query.offset = size * (page - 1);
  } else if (page || size) {
    const err = new Error("Page and Size must be greater than or equal to 1");
    return next(err);
  }

  if (minLat) {
    minLat = parseFloat(minLat);
    if (isNaN(minLat) || minLat < -90) {
      const err = new Error("Minimum latitude is invalid");
      return next(err);
    }
    if (minLat) where.lat = { [Op.gte]: minLat };
  }

  if (maxLat) {
    maxLat = parseFloat(maxLat);
    if (isNaN(maxLat) || maxLat > 90) {
      const err = new Error("Maximum latitude is invalid");
      return next(err);
    }
    if (maxLat) where.lat = { [Op.lte]: maxLat };
  }
  if (minLng) {
    minLng = parseFloat(minLng);
    if (isNaN(minLat) || minLat < -180) {
      const err = new Error("Minimum longitude is invalid");
      return next(err);
    }
    if (minLng) where.lng = { [Op.gte]: minLng };
  }
  if (maxLng) {
    maxLng = parseFloat(maxLng);
    if (isNaN(maxLng) || maxLng < 180) {
      const err = new Error("Maximum longitude is invalid");
      return next(err);
    }
    if (maxLng) where.lng = { [Op.lte]: maxLng };
  }

  if (minPrice) minPrice = parseFloat(minPrice);
  if (maxPrice) maxPrice = parseFloat(maxPrice);
  if (minPrice < 0 || maxPrice < 0) {
    const err = new Error(
      "minPrice and maxPrice must be greater than or equal to 1"
    );
    return next(err);
  } else {
    if (minPrice) where.price = { [Op.gte]: minPrice };
    if (maxPrice) where.price = { [Op.lte]: maxPrice };
  }

  const spots = await Spot.findAll({ where, ...query });
  if (spots.length > 0) {
    const result = await handleAllSpotsReponse(spots);
    return res.json({ Spots: result, page, size });
  } else {
    return res.json({ Spots: "Add an spot" });
  }
});

//Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const spots = await Spot.findAll({
    where: { ownerId: userId },
  });

  if (spots.length > 0) {
    const result = await handleAllSpotsReponse(spots);
    return res.json({ Spots: result });
  } else {
    return res.json({ Spots: "Become a Host in 10 easy steps" });
  }
});

//Get details of a Spot from an id
router.get("/:spotId", async (req, res, next) => {
  let result = {};

  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot Not Found";
    err.errors = ["Spot couldn't be found"];
    return next(err);
  } else {
    result = { ...spot.dataValues };
  }

  const { numReviews, avgRating } = await getSpotReview(spot);
  result.numReviews = numReviews;
  result.avgStarRating = avgRating;

  const spotImages = await spot.getSpotImages({
    includes: { model: SpotImage },
    attributes: ["id", "url", "preview"],
  });
  if (spotImages.length > 0) {
    result.SpotImage = spotImages;
  } else {
    result.SpotImage = null;
  }

  const owner = await spot.getUser({
    includes: { model: User },
    attributes: ["id", "firstName", "lastName"],
  });
  result.Owner = { ...owner.dataValues };

  return res.json(result);
});

//Create a Spot
router.post("/", requireAuth, async (req, res) => {
  const ownerId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  return res.json(spot);
});

//Edit a Spot
router.put("/:spotId", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot Not Found";
    err.errors = ["Spot couldn't be found"];
    return next(err);
  }

  if (userId === spot.dataValues.ownerId) {
    const updatedSpot = await spot.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    return res.json(updatedSpot);
  } else return res.json("Only owner can update");
});

//Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot Not Found";
    err.errors = ["Spot couldn't be found"];
    return next(err);
  }

  if (userId === spot.dataValues.ownerId) {
    await spot.destroy();
    res.status = 200;
    return res.json({
      message: `Successfully deleted ${spotId}`,
      statusCode: 200,
    });
  } else return res.json("Only owner can update");
});

//Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { spotId } = req.params;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot Not Found";
    err.errors = ["Spot couldn't be found"];
    return next(err);
  }

  if (userId === spot.dataValues.ownerId) {
    const image = await SpotImage.create({ spotId, url, preview });
    const { id } = image.dataValues;
    return res.json({ id, url, preview });
  } else return res.json("Only owner can update");
});

//Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot Not Found";
    err.errors = ["Spot couldn't be found"];
    return next(err);
  }

  if (userId === spot.dataValues.ownerId) {
    const bookings = await Booking.findAll({
      where: { spotId },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    });
    return res.json({ Bookings: bookings });
  } else {
    const bookings = await Booking.findAll({
      where: { spotId },
      attributes: ["spotId", "startDate", "endDate"],
    });
    return res.json({ Bookings: bookings });
  }
});

//Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { spotId } = req.params;
  const { startDate: newStartDateStr, endDate: newEndDateStr } = req.body;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot Not Found";
    err.errors = ["Spot couldn't be found"];
    return next(err);
  }

  if (userId === spot.dataValues.ownerId) {
    const err = new Error("Spot must NOT belong to the current users");
    err.status = 403;
    err.title = "Forbidden";
    err.errors = ["Spot must NOT belong to the current user"];
    return next(err);
  }

  const bookings = await Booking.findAll({ where: { spotId } });
  if (bookings.length) {
    const newStartDate = new Date(newStartDateStr);
    const newEndDate = new Date(newEndDateStr);

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

  const booking = await Booking.create({
    spotId,
    userId,
    startDate: newStartDateStr,
    endDate: newEndDateStr,
  });
  return res.json(booking);
});

//Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res, next) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot Not Found";
    err.errors = ["Spot couldn't be found"];
    return next(err);
  }

  const reviews = await Review.findAll({
    where: { spotId },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  return res.json({ Reviews: reviews });
});

//Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { spotId: spotIdStr } = req.params;
  const { review, stars } = req.body;
  const spotId = parseInt(spotIdStr);

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot Not Found";
    err.errors = ["Spot couldn't be found"];
    return next(err);
  }

  const alreadyExists = await Review.count({
    where: {
      spotId,
      userId,
    },
  });
  if (alreadyExists) {
    const err = new Error("User already has a review for this spot");
    err.status = 403;
    err.title = "Already Exits";
    err.errors = ["User already has a review for this spot"];
    return next(err);
  }

  const newReview = await Review.create({
    spotId,
    userId,
    review,
    stars,
  });
  return res.json(newReview);
});

module.exports = router;
