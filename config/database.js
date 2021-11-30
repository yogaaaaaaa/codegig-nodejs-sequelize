const { Sequelize } = require("sequelize");
require("dotenv").config();

//Database connection =======================
module.exports = new Sequelize("codegig", "postgres", process.env.db_pass, {
  host: "localhost",
  dialect: "postgres",
});
