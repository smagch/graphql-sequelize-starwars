'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('characters', [
      {
        id: 1000,
        type: 'Human',
        name: 'Luke Skywalker',
      },
      {
        id: 1001,
        type: 'Human',
        name: 'Darth Vader',
      },
      {
        id: 1002,
        type: 'Human',
        name: 'Han Solo',
      },
      {
        id: 1003,
        type: 'Human',
        name: 'Leia Organa',
      },
      {
        id: 1004,
        type: 'Human',
        name: 'Wilhuff Tarkin',
      },
      {
        id: 2000,
        type: 'Droid',
        name: 'C-3PO',
      },
      {
        id: 2001,
        type: 'Droid',
        name: 'R2-D2',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('characters', null, {});
  }
};
