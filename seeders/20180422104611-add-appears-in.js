'use strict';

const { sequelize, Episode, Character } = require('../models');

const appearanceMap = {
  '1000': [4, 5, 6],
  '1001': [4, 5, 6],
  '1002': [4, 5, 6],
  '1003': [4, 5, 6],
  '1004': [4],
  '2000': [4, 5, 6],
  '2001': [4, 5, 6],
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await sequelize.sync();

    const [four, five, six] = await Episode.findAll({
      order: ['id'],
    });

    const episodeMap = {
      '4': four,
      '5': five,
      '6': six,
    };

    for (const [id, episodeIds] of Object.entries(appearanceMap)) {
      const character = await Character.findById(id);
      for (const episodeId of episodeIds) {
        const episode = episodeMap[episodeId];
        if (!episode) {
          throw new Error('invalid episode number: ' + episodeId);
        }
        await character.addAppearsIn(episode);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await sequelize.sync();
    for (const id of Object.keys(appearanceMap)) {
      const character = await Character.findById(id);
      await character.setAppearsIn([]);
    }
  },
};
