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

//Delete a Spot Image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { imageId } = req.params;

  const image = await SpotImage.findByPk(imageId);
  if (!image) {
    const err = new Error("Spot Image couldn't be found");
    err.status = 404;
    err.title = "spotImage Not Found";
    err.errors = ["Spot Image couldn't be found"];
    return next(err);
  }

  const spot = await Spot.findByPk(image.dataValues.spotId);
  if (userId !== spot.dataValues.ownerId) {
    const err = new Error("Spot must belong to the current user");
    err.status = 403;
    err.title = "Forbidden";
    err.errors = ["Spot must belong to the current user"];
    return next(err);
  }

  await image.destroy();

  return res.json({
    message: `Successfully deleted spotImageId:${imageId}`,
    statusCode: 200,
  });
});

module.exports = router;
