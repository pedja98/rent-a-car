'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [
        {
          username: 'admin',
          email: 'renta_car@mail.com',
          password: 'ADMIN11',
          type: 'admin',
          name: 'ADMIN',
          surname: '',
          address: '',
        }
      ]
      , {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users', {type: 'admin'}, {})
  }
};
