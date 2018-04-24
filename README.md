# Sequelize

A demonstration of [graphql-sequelize].

The GraphQL schema, the Star Wars, is borrowed from [graphql-js] (though there
are minor differences).

## Installation

Assume you've already installed [yarn](https://yarnpkg.com/lang/en/):

```sh
$ yarn
```

After configuring `password` option in `config/config.json`, you need to create
a database with the following commands:

```sh
$ yarn sequelize db:create
$ yarn sequelize db:migrate
$ yarn sequelize db:seed:all
```

Then, start server.

```sh
$ yarn start
```

Example query: <http://localhost:4000/graphql?query=%7B%0A%20%20human(id%3A%201001)%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20homePlanet%0A%20%20%20%20friends%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20droid(id%3A%202000)%20%7B%0A%20%20%20%20primaryFunction%0A%20%20%7D%0A%7D%0A>

The `Prettify` button will help readability of the query above.

[graphql-js]: https://github.com/graphql/graphql-js/blob/v0.13.2/src/__tests__/starWarsSchema.js
[graphql-sequelize]: https://github.com/mickhansen/graphql-sequelize
