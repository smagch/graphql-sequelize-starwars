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
    metadata: {
      type: DataTypes.JSON,
      allowNull: true
    },
  }, {
    timestamps: false,
    validate: {
      validateMetadata() {
        if (!this.metadata) {
          return;
        }
        for (const prop of Object.keys(this.metadata)) {
          if (this.type === 'Human' && prop !== 'homePlanet') {
            throw new Error('a Human can only have homePlanet metadata');
          }
          if (this.type === 'Droid' && prop !== 'primaryFunction') {
            throw new Error('a Droid can only have primaryFunction metadata');
          }
        }
      }
    }
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