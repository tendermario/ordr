// Update with your config settings.
const settings = require("./settings"); // settings.json
module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: 'create_milestones'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: settings.database,
      user:     settings.user,
      password: settings.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: settings.database,
      user:     settings.user,
      password: settings.password,
      host:     settings.hostname,
      ssl:      settings.ssl,
      port:     settings.port
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }

};
