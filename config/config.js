/* eslint-disable no-undef */
// console.log("NODE_ENV", process.env.NODE_ENV);

module.exports = {
  development: {
    username: "admin",
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
  docker: {
    username: "admin",
    password: process.env.DB_PASSWORD,
    database: "server",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
  test: {
    username: "admin",
    password: null,
    database: "obecqi_test",
    host: "localhost",
    dialect: "postgres",
  },
  production: {
    username: "admin",
    password: process.env.DB_PASSWORD,
    database: "server",
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  local: {
    username: "admin",
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  }
};
