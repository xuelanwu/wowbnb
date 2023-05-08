const express = require("express");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { requireAuth } = require("../../utils/auth");
const {
  User,
  Booking,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
} = require("../../db/models");
const { Sequelize, Op } = require("sequelize");

const router = express.Router();

//Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const reviews = await Review.findAll({
    where: { userId },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ["createdAt", "updatedAt", "description"],
        },
      },
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

  for (let review of reviews) {
    const previewImage = await SpotImage.findOne({
      where: {
        spotId: review.dataValues.spotId,
        preview: true,
      },
    });
    review.dataValues.Spot.dataValues.previewImage =
      previewImage.dataValues.url;
  }

  return res.json({ Reviews: reviews });
});

//Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { reviewId } = req.params;
  const { url } = req.body;

  const review = await Review.findByPk(reviewId);
  if (!review) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    err.title = "Review Not Found";
    err.errors = ["Review couldn't be found"];
    return next(err);
  }

  if (userId !== review.dataValues.userId) {
    const err = new Error("Review must belong to the current user");
    err.status = 403;
    err.title = "Forbidden";
    err.errors = ["Review must belong to the current user"];
    return next(err);
  }

  const imagesNum = await ReviewImage.count({
    where: {
      reviewId,
    },
  });
  if (imagesNum >= 10) {
    const err = new Error(
      "Maximum number of images for this resource was reached"
    );
    err.status = 403;
    err.title = "Max Images Reached";
    err.errors = ["Maximum number of images for this resource was reached"];
    return next(err);
  }

  const newImage = await ReviewImage.create({
    reviewId,
    url,
  });

  return res.json({ id: newImage.dataValues.id, url: newImage.dataValues.url });
});

//Edit a Review
router.put("/:reviewId", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { reviewId } = req.params;
  const { review, stars } = req.body;

  const existedReview = await Review.findByPk(reviewId);
  if (!existedReview) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    err.title = "Review Not Found";
    err.errors = ["Review couldn't be found"];
    return next(err);
  }

  if (userId !== existedReview.dataValues.userId) {
    const err = new Error("Review must belong to the current user");
    err.status = 403;
    err.title = "Forbidden";
    err.errors = ["Review must belong to the current user"];
    return next(err);
  }

  const updatedReview = await existedReview.update({
    review,
    stars,
  });
  return res.json(updatedReview);
});

//Delete a Review
router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { reviewId } = req.params;

  const review = await Review.findByPk(reviewId);
  if (!review) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    err.title = "Review Not Found";
    err.errors = ["Review couldn't be found"];
    return next(err);
  }

  if (userId !== review.dataValues.userId) {
    const err = new Error("Review must belong to the current user");
    err.status = 403;
    err.title = "Forbidden";
    err.errors = ["Review must belong to the current user"];
    return next(err);
  }

  await review.destroy();

  return res.json({
    message: `Successfully deleted reviewId:${reviewId}`,
    statusCode: 200,
  });
});

module.exports = router;
