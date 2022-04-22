'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rents', {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date_of_renting: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cancelled: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(80),
        allowNull: false,
        references: {
          model: 'Users',
          key: 'username'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      plate_num: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'Cars',
          key: 'plate_num'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      date_of_return: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cost: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rents');
  }
};