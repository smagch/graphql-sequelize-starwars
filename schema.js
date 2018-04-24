const { sequelize, Sequelize, Character, Episode } = require('./models');
const { resolver } = require('graphql-sequelize');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLSchema,
  GraphQLInterfaceType,
  GraphQLEnumType,
} = require('graphql');

const episodeEnum = new GraphQLEnumType({
  name: 'Episode',
  description: 'One of the films in the Star Wars Trilogy',
  values: {
    NEWHOPE: {
      value: 4,
      description: 'Released in 1977.',
    },
    EMPIRE: {
      value: 5,
      description: 'Released in 1980.',
    },
    JEDI: {
      value: 6,
      description: 'Released in 1983.',
    },
  },
});

const characterInterface = new GraphQLInterfaceType({
  name: 'Character',
  description: 'A character in the Star Wars Trilogy',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'The id of the character.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the character.',
    },
    friends: {
      type: GraphQLList(characterInterface),
      description:
        'The friends of the character, or an empty list if they ' +
        'have none.',
    },
    appearsIn: {
      type: GraphQLList(episodeEnum),
      description: 'Which movies they appear in.',
    },
  }),
  resolveType(character) {
    if (character.type === 'Human') {
      return humanType;
    }
    if (character.type === 'Droid') {
      return droidType;
    }
  },
});

const humanType = new GraphQLObjectType({
  name: 'Human',
  description: 'A humanoid creature in the Star Wars universe.',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'The id of the human.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the human.',
    },
    friends: {
      type: GraphQLList(characterInterface),
      description:
        'The friends of the human, or an empty list if they have none.',
      resolve: resolver(Character.Friends),
    },
    appearsIn: {
      type: GraphQLList(episodeEnum),
      description: 'Which movies they appear in.',
      resolve: resolver(Character.AppearsIn, {
        after(result) {
          return result.map(episode => episode.id);
        }
      }),
    },
    homePlanet: {
      type: GraphQLString,
      description: 'The home planet of the human, or null if unknown.',
      resolve (human) {
        const metadata = human.get('metadata');
        if (metadata) {
          return metadata.homePlanet;
        }
      }
    }
  }),
  interfaces: [characterInterface],
});

const droidType = new GraphQLObjectType({
  name: 'Droid',
  description: 'A mechanical creature in the Star Wars universe.',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'The id of the droid.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the droid.',
    },
    friends: {
      type: GraphQLList(characterInterface),
      description:
        'The friends of the droid, or an empty list if they have none.',
      resolve: resolver(Character.Friends),
    },
    appearsIn: {
      type: GraphQLList(episodeEnum),
      description: 'Which movies they appear in.',
      resolve: resolver(Character.AppearsIn, {
        after(result) {
          return result.map(episode => episode.id);
        }
      }),
    },
    primaryFunction: {
      type: GraphQLString,
      description: 'The primary function of the droid.',
      resolve (human) {
        const metadata = human.get('metadata');
        if (metadata) {
          return metadata.primaryFunction;
        }
      }
    },
  }),
  interfaces: [characterInterface],
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hero: {
      type: characterInterface,
      args: {
        episode: {
          description:
            'If omitted, returns the hero of the whole saga. If ' +
            'provided, returns the hero of that particular episode.',
          type: episodeEnum,
        },
      },
      resolve: (root, { episode }) => {
        const heroId = episode === 5 ? 1000 : 2001;
        return Character.findById(heroId);
      },
    },
    human: {
      type: humanType,
      args: {
        id: {
          description: 'id of the human',
          type: GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: resolver(Character)
    },
    droid: {
      type: droidType,
      args: {
        id: {
          description: 'id of the droid',
          type: GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: resolver(Character)
    },
  }),
});

module.exports = new GraphQLSchema({
  query: queryType,
  types: [humanType, droidType],
});
