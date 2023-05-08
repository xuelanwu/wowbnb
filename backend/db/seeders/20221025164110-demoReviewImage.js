"use strict";

const demoReviewImages = [
  { reviewId: 1, url: "image1.url" },
  { reviewId: 1, url: "image2.url" },
  { reviewId: 2, url: "image3.url" },
  { reviewId: 3, url: "image4.url" },
  { reviewId: 2, url: "image5.url" },
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
    await queryInterface.bulkInsert("ReviewImages", demoReviewImages);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete("ReviewImages", {
      [Op.or]: demoReviewImages,
    });
  },
};
