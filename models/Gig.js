// const Sequelize = require("sequelize");
const db = require("../config/database");
const {Sequelize, Model, DataTypes } = require("sequelize")

const Gig = db.define("gig", {
  title: {
    type: DataTypes.STRING,
  },
  technologies: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  budget: {
    type: DataTypes.STRING,
  },
  contact_email: {
    type: DataTypes.STRING,
  },
});

module.exports = { Gig };
