'use strict';
module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      values: ['Human', 'Droid'],
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  Character.associate = function(models) {
    Character.Friends = Character.belongsToMany(Character, {
      as: 'friends',
      through: 'CharacterFriends',
    });
    Character.AppearsIn = Character.belongsToMany(models.Episode, {
      as: 'appearsIn',
      through: 'CharacterAppearsIn',
    });
  };

  return Character;
};