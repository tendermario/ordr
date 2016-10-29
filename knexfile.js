// Update with your config settings.
const settings = require("./settings"); // settings.json
require('dotenv').config();

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
      database: process.env.DATABASE,
      user:     process.env.DB_USER,
      password: process.env.PASSWORD


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
    user     : process.env.DB_USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
    host     : process.env.HOSTNAME,
    port     : process.env.PORT,
    ssl      : true
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
