"use strict";

const demoSpots = [
  {
    ownerId: 1,
    address: "aaa456 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "USA",
    lat: 37.7645351,
    lng: -122.4730321,
    name: "Serenity Cottage",
    description:
      "Welcome to our charming 2b1b house, perfect for your next vacation! Located in a quiet and peaceful neighborhood, our house offers a relaxing escape from the hustle and bustle of city life.",
    price: 123,
  },
  {
    ownerId: 2,
    address: "2944 Rose Avenue",
    city: "Metairie",
    state: "Louisiana",
    country: "USA",
    lat: 41.780071,
    lng: -86.215736,
    name: "The Garden Retreat",
    description:
      "As you enter, you'll immediately notice the warm and inviting atmosphere of the living room, which features comfortable seating, a flat-screen TV, and large windows that let in plenty of natural light.",
    price: 234,
  },
  {
    ownerId: 3,
    address: "3961 Hall Valley Drive",
    city: "Clarksburg",
    state: "West Virginia",
    country: "USA",
    lat: 39.206917,
    lng: -80.388603,
    name: "Coastal Escape",
    description:
      "The house has two cozy bedrooms, both of which are furnished with comfortable beds, fresh linens, and plenty of closet space. The bathroom is modern and clean, and comes with a full bath and shower.",
    price: 345,
  },
  {
    ownerId: 4,
    address: "1876 Harrison Street",
    city: "Oakland",
    state: "California",
    country: "USA",
    lat: 37.908894,
    lng: -122.259377,
    name: "City Lights Oasis",
    description:
      "Our house is conveniently located near many local attractions, including parks, museums, and restaurants. We provide a detailed guidebook to help you plan your stay and make the most of your visit.",
    price: 213,
  },
  {
    ownerId: 5,
    address: "4169 Lilac Lane",
    city: "Willacoochee",
    state: "Georgia",
    country: "USA",
    lat: 31.33453,
    lng: -83.025322,
    name: "Rustic Charm Cabin",
    description:
      "Whether you're here for a weekend getaway or an extended stay, our 2b1b house is the perfect home away from home. We look forward to hosting you!",
    price: 123,
  },
  {
    ownerId: 2,
    address: "bbb789 Rosewood Drive",
    city: "Miami",
    state: "Florida",
    country: "USA",
    lat: 25.7738627,
    lng: -80.1944215,
    name: "Tropical Retreat",
    description:
      "Escape to paradise in our luxurious 3b2b villa! Located just steps from the beach, our home offers stunning ocean views and top-of-the-line amenities for the ultimate vacation experience.",
    price: 345,
  },
  {
    ownerId: 3,
    address: "ccc123 Main Street",
    city: "Toronto",
    state: "Ontario",
    country: "Canada",
    lat: 43.653226,
    lng: -79.3831843,
    name: "Cozy Condo",
    description:
      "Stay in the heart of the city in our stylish 1b1b condo! Perfect for business travelers or couples, our condo offers modern furnishings and all the comforts of home.",
    price: 89,
  },
  {
    ownerId: 4,
    address: "ddd456 Oak Avenue",
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
    lat: -33.8727507,
    lng: 151.2064132,
    name: "Harbor View",
    description:
      "Experience the best of Sydney in our spacious 2b2b apartment! With stunning views of the harbor and the city skyline, our apartment is the perfect base for your Australian adventure.",
    price: 267,
  },
  {
    ownerId: 5,
    address: "eee789 Cherry Blossom Road",
    city: "Tokyo",
    state: "Tokyo",
    country: "Japan",
    lat: 35.6894875,
    lng: 139.6917064,
    name: "Zen Retreat",
    description:
      "Find inner peace in our serene 1b1b apartment in the heart of Tokyo! Our minimalist decor and traditional Japanese elements create a calming atmosphere for your stay.",
    price: 175,
  },
  {
    ownerId: 1,
    address: "fff123 Maple Street",
    city: "Paris",
    state: "Ile-de-France",
    country: "France",
    lat: 48.856614,
    lng: 2.3522219,
    name: "Charming Apartment in Le Marais",
    description:
      "Stay in the heart of Paris in our lovely 1b1b apartment! Located in the trendy Le Marais district, our home is surrounded by the city's best shops, cafes, and museums.",
    price: 200,
  },
  {
    ownerId: 2,
    address: "ggg456 Cedar Road",
    city: "Vancouver",
    state: "British Columbia",
    country: "Canada",
    lat: 49.2827291,
    lng: -123.1207375,
    name: "Mountain Getaway",
    description:
      "Escape to the great outdoors in our cozy 2b1b cabin! Nestled in the mountains just outside of Vancouver, our home is the perfect place to relax and reconnect with nature.",
    price: 150,
  },
  {
    ownerId: 3,
    address: "hhh789 Ocean View Drive",
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
    lat: -33.852154,
    lng: 151.214961,
    name: "Beachfront Retreat",
    description:
      "Experience the ultimate beach vacation in our spacious 4b3b house! With direct access to the sand and surf, our home is perfect for families or groups of friends.",
    price: 500,
  },
  {
    ownerId: 2,
    address: "iii123 Elm Street",
    city: "New York",
    state: "New York",
    country: "USA",
    lat: 40.7127753,
    lng: -74.0059728,
    name: "Modern Loft in SoHo",
    description:
      "Live like a New Yorker in our stylish 2b2b loft in SoHo! With high ceilings and industrial-chic decor, our home is the perfect blend of comfort and cool.",
    price: 300,
  },
  {
    ownerId: 1,
    address: "jjj456 Sunset Boulevard",
    city: "Los Angeles",
    state: "California",
    country: "USA",
    lat: 34.0900091,
    lng: -118.3617443,
    name: "Hollywood Hills Villa",
    description:
      "Live like a movie star in our luxurious 5b4b villa in the Hollywood Hills! With breathtaking views of the city and all the amenities you could want, our home is the ultimate LA experience.",
    price: 1000,
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
    await queryInterface.bulkInsert("Spots", demoSpots);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete("Spots", { [Op.or]: demoSpots });
  },
};
