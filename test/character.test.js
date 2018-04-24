
const { sequelize, Sequelize, Character, Episode } = require('../models');
const expect = require('expect.js');

describe('character model', () => {
  before(async () => {
    await sequelize.sync();
  });

  describe('Human type', () => {
    let human = null;
    afterEach(async () => {
      if (human) {
        await human.destroy();
        human = null;
      }
    });

    it('should be able to create', async () => {
      human = await Character.create({
        id: 1,
        type: 'Human',
        name: 'test human',
      });
    });

    it('should be able to add metadata', async () => {
      human = await Character.create({
        id: 1,
        type: 'Human',
        name: 'test human',
        metadata: {
          homePlanet: 'Tatooine'
        }
      });
    });

    it('should not be able to add primaryFunction', async () => {
      let err;
      try {
        human = await Character.create({
          id: 1,
          type: 'Human',
          name: 'test human',
          metadata: {
            primaryFunction: 'Protocol'
          }
        });
      } catch (ex) {
        err = ex;
      }
      expect(err).to.be.ok();
      expect(err.message).to.be('Validation error: a Human can only have homePlanet metadata');
    });
  });

  describe('Droid type', () => {
    let droid = null;
    afterEach(async () => {
      if (droid) {
        await droid.destroy();
        droid = null;
      }
    });

    it('should be able to add primaryFunction metadata', async () => {
      droid = await Character.create({
        id: 1,
        type: 'Droid',
        name: 'test droid',
        metadata: {
          primaryFunction: 'Protocol'
        },
      });
    });

    it('should not be able to add metadata other than primaryFunction', async () => {
      let err;
      try {
        droid = await Character.create({
          id: 1,
          type: 'Droid',
          name: 'test droid',
          metadata: {
            homePlanet: 'Protocol'
          },
        });
      } catch (ex) {
        err = ex;
      }
      expect(err).to.be.ok();
      expect(err.message).to.be('Validation error: a Droid can only have primaryFunction metadata');
    });
  });
});
