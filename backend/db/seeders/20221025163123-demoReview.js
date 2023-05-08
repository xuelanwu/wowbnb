"use strict";

const demoReviews = [
  {
    spotId: 1,
    userId: 4,
    review:
      "We had an amazing stay at this beautiful cottage! The location was perfect, tucked away in a quiet corner with breathtaking views of the mountains.",
    stars: 5,
  },
  {
    spotId: 1,
    userId: 2,
    review:
      "The cottage itself was cozy and well-equipped with everything we needed for a comfortable stay. We especially loved the fireplace, which added to the rustic charm of the place.",
    stars: 4,
  },
  {
    spotId: 1,
    userId: 3,
    review:
      "Our hosts were friendly and accommodating, and made sure we had everything we needed. We can't wait to come back!",
    stars: 3,
  },
  {
    spotId: 2,
    userId: 1,
    review:
      "The Serenity Cottage was a dream come true. Peaceful, relaxing, and with all the amenities we needed. Highly recommend!",
    stars: 2,
  },
  {
    spotId: 2,
    userId: 3,
    review:
      "Lakeside Haven was just what we needed for a relaxing weekend. Clean, well-equipped, and with stunning views of the lake. Highly recommend!",
    stars: 1,
  },
  {
    spotId: 2,
    userId: 4,
    review:
      "Rustic Charm Cabin was an absolute delight. Loved the cozy feel and the beautiful surroundings. Can't wait to come back!",
    stars: 1,
  },
  {
    spotId: 3,
    userId: 4,
    review:
      "The City Lights Oasis exceeded our expectations. Close to all the best restaurants and nightlife, but quiet and comfortable. Great hosts too!",
    stars: 4,
  },
  {
    spotId: 3,
    userId: 5,
    review:
      "Coastal Escape was the perfect retreat for our family. The beach was just steps away and the house was beautifully decorated. We loved our stay!",
    stars: 3,
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
    await queryInterface.bulkInsert("Reviews", demoReviews);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete("Reviews", { [Op.or]: demoReviews });
  },
};
