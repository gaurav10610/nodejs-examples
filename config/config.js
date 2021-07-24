require("dotenv").config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DIALECT, DB_PORT, DB_DATABASE } =
  process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
