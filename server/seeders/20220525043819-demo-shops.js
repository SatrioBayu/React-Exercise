"use strict";

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
    await queryInterface.bulkInsert("Shops", [
      {
        name: "Shirt",
        description: "This is official shirt from Studio Ghibli",
        image: "shirt.jpg",
        price: "200000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Polo",
        description: "This is official polo from Studio Ghibli",
        image: "polo.jpg",
        price: "200000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mug",
        description: "This is official mug from Studio Ghibli",
        image: "mug.jpg",
        price: "200000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
