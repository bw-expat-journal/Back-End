require('dotenv').config(); // load .env variables

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: './models/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './models/seeds' },
  },
};
