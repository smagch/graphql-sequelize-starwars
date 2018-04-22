'use strict';

const { sequelize, Character } = require('../models');

const friendMap = {
  '1000': ['1002', '1003', '2000', '2001'],
  '1001': ['1004'],
  '1002': ['1000', '1003', '2001'],
  '1003': ['1000', '1002', '2000', '2001'],
  '1004': ['1001'],
  '2000': ['1000', '1002', '1003', '2001'],
  '2001': ['1000', '1002', '1003'],
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await sequelize.sync();
    for (const [id, friendIds] of Object.entries(friendMap)) {
      const chracter = await Character.findById(id);
      for (const friendId of friendIds) {
        const friend = await Character.findById(friendId);
        await chracter.addFriend(friend);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await sequelize.sync();
    for (const id of Object.keys(friendMap)) {
      const chracter = await Character.findById(id);
      await chracter.setFriends([]);
    }
  },
};
