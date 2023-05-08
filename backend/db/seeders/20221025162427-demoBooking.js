"use strict";

const demoBookings = [
  { spotId: 1, userId: 5, startDate: "2025-01-24", endDate: "2025-01-25" },
  { spotId: 2, userId: 5, startDate: "2025-02-24", endDate: "2025-02-25" },
  { spotId: 3, userId: 1, startDate: "2025-03-24", endDate: "2025-03-25" },
  { spotId: 1, userId: 1, startDate: "2025-04-24", endDate: "2025-04-25" },
  { spotId: 1, userId: 2, startDate: "2025-05-24", endDate: "2025-05-25" },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Bookings", demoBookings);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete("Bookings", { [Op.or]: demoBookings });
  },
};
