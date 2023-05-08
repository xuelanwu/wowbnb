"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { targetKey: "id", foreignKey: "userId" });
      Booking.belongsTo(models.Spot, { targetKey: "id", foreignKey: "spotId" });
    }
  }
  Booking.init(
    {
      spotId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isEndAfterStart(value) {
            const sDate = new Date(value);
            const eDate = new Date(this.endDate);
            if (sDate.getTime() >= eDate.getTime()) {
              throw new Error("endDate cannot be on or before startDate");
            }
          },
        },
      },
      endDate: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
