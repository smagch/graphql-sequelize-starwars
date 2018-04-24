'use strict';

const { sequelize, Character } = require('../models');

const metadataMap = {
  '1000': { homePlanet: 'Tatooine' },
  '1001': { homePlanet: 'Tatooine' },
  '1003': { homePlanet: 'Alderaan' },
  '2000': { primaryFunction: 'Protocol' },
  '2001': { primaryFunction: 'Astromech' },
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await sequelize.sync();
    for (const [id, metadata] of Object.entries(metadataMap)) {
      const character = await Character.findById(id);
      await character.update({ metadata });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await sequelize.sync();
    for (const id of Object.keys(metadataMap)) {
      const character = await Character.findById(id);
      await character.update({
        metadata: null
      });
    }
  }
};
