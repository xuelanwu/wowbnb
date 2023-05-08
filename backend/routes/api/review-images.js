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

//Delete a Review Image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { imageId } = req.params;

  const image = await ReviewImage.findByPk(imageId);
  if (!image) {
    const err = new Error("Review Image couldn't be found");
    err.status = 404;
    err.title = "reviewImage Not Found";
    err.errors = ["Review Image couldn't be found"];
    return next(err);
  }

  const review = await Review.findByPk(image.dataValues.reviewId);
  if (userId !== review.dataValues.userId) {
    const err = new Error("Review must belong to the current user");
    err.status = 403;
    err.title = "Forbidden";
    err.errors = ["Review must belong to the current user"];
    return next(err);
  }

  await image.destroy();

  return res.json({
    message: `Successfully deleted reviewImageId:${imageId}`,
    statusCode: 200,
  });
});

module.exports = router;
