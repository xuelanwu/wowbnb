"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { targetKey: "id", foreignKey: "ownerId" });
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        hooks: true,
      });
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        hooks: true,
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Spot.init(
    {
      ownerId: { type: DataTypes.INTEGER, allowNull: false },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Street address is required",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "City address is required",
          },
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Statet address is required",
          },
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Country address is required",
          },
        },
      },
      lat: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        validate: {
          min: {
            args: -90,
            msg: "Latitude is not valid",
          },
          max: {
            args: 90,
            msg: "Latitude is not valid",
          },
        },
      },
      lng: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        validate: {
          min: {
            args: -180,
            msg: "Longitude is not valid",
          },
          max: {
            args: 180,
            msg: "Longitude is not valid",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 50],
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is required",
          },
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price per day is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
