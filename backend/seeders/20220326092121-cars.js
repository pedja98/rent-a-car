'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cars',
      [
        {
          plate_num: "BG 102-WW",
          brand: "BMW",
          model: "X6",
          color: "black",
          price: 1500,
          pic: 'http://localhost:3000/images/bmw.jpg'
        },
        {
          plate_num: "BG 105-IW",
          brand: "AUDI",
          model: "A3",
          color: "grey",
          price: 1200,
          pic: 'http://localhost:3000/images/audi.jpg'
        },
        {
          plate_num: "BG 189-UY",
          brand: "Porsche",
          model: "Macan",
          color: "black",
          price: 1850,
          pic: null
        },
        {
          plate_num: "BG 200-PP",
          brand: "Lamborghini",
          model: "Huracan",
          color: "white",
          price: 2150,
          pic: null
        },
        {
          plate_num: "KG 148-RR",
          brand: "Ferrari",
          model: "488",
          color: "red",
          price: 2200,
          pic: null
        },
        {
          plate_num: "KG 197-PP",
          brand: "Lamborghini",
          model: "Aventador",
          color: "orange",
          price: 2150,
          pic: 'http://localhost:3000/images/advent.jpg'
        },
        {
          plate_num: "KG 198-PP",
          brand: "Lamborghini",
          model: "Urus",
          color: "yellow",
          price: 2150,
          pic: 'http://localhost:3000/images/urus.jpg'
        },
      ],
      {}
    );

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
