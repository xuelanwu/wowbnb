"use strict";

const demoSpotImages = [
  {
    spotId: 1,
    url: "https://images.pexels.com/photos/2980955/pexels-photo-2980955.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://images.pexels.com/photos/1862402/pexels-photo-1862402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://images.pexels.com/photos/2480608/pexels-photo-2480608.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: true,
  },
  {
    spotId: 1,
    url: "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://images.pexels.com/photos/3617496/pexels-photo-3617496.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://images.pexels.com/photos/750697/pexels-photo-750697.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://images.pexels.com/photos/449461/pexels-photo-449461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://images.pexels.com/photos/2566860/pexels-photo-2566860.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://images.pexels.com/photos/1559825/pexels-photo-1559825.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: true,
  },
  {
    spotId: 6,
    url: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    preview: true,
  },
  {
    spotId: 7,
    url: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    preview: true,
  },
  {
    spotId: 8,
    url: "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    preview: true,
  },
  {
    spotId: 9,
    url: "https://images.pexels.com/photos/463734/pexels-photo-463734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    preview: true,
  },
  {
    spotId: 10,
    url: "https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    preview: true,
  },
  {
    spotId: 11,
    url: "https://images.pexels.com/photos/950058/pexels-photo-950058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    preview: true,
  },
  {
    spotId: 12,
    url: "https://images.pexels.com/photos/3617496/pexels-photo-3617496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    preview: true,
  },
  {
    spotId: 13,
    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    preview: true,
  },
  {
    spotId: 14,
    url: "https://images.pexels.com/photos/463996/pexels-photo-463996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    preview: true,
  },
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
    await queryInterface.bulkInsert("SpotImages", demoSpotImages);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("SpotImages", demoSpotImages);
  },
};
