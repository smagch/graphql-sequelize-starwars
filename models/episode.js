'use strict';
module.exports = (sequelize, DataTypes) => {
  const Episode = sequelize.define('Episode', {
  }, {
    timestamps: false,
  });
  return Episode;
};
