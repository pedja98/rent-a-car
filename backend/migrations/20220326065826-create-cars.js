'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cars', {
      plate_num: {
        type: Sequelize.STRING(20),
        primaryKey: true,
      },

      brand: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pic: {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cars');
  }
};