const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
require('dotenv').config();
const { Sequelize } = require('sequelize');

const app = express();

//Database connection =======================
const db = new Sequelize("codegig", "postgres", process.env.db_pass, {
  host: "localhost",
  dialect: "postgres" /* one of 'mysql' | 'mariadb' |  | 'mssql' */,
});

//DB test if connected
db.authenticate()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//Route =====================================
app.get("/", (req, res) => {
  res.send("INDEX");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
