const express = require("express");
const router = express.Router();
const db = require("../config/database.js");
const Gig = require("../models/Gig").Gig;
let bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

let urlencodedParser = bodyParser.urlencoded({ extended: false });

//Get gig list
router.get("/", (req, res) =>
  Gig.findAll({ raw: true })
    .then((gigs) => {
      res.render("gigs", { gigs });
    })
    .catch((err) => console.log(err))
);

//display form add gigs
router.get("/add", (req, res) => res.render("add"));

//Add a gig
router.post("/add", urlencodedParser, (req, res) => {
  let { title, technologies, description, budget, contact_email } = req.body;
  let errors = [];

  //checking if empty fields
  if (!title) {
    errors.push({ text: "Tambahkan title..." });
  }
  if (!technologies) {
    errors.push({ text: "Tambahkan teknologi yang digunakan..." });
  }
  if (!description) {
    errors.push({ text: "Tambahkan deskripsi..." });
  }
  if (!contact_email) {
    errors.push({ text: "Tambahkan kontak email..." });
  }

  //check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      description,
      budget,
      contact_email,
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `Rp.${budget}`;
    }

    //Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ",");
    //insert into table
    Gig.create({
      title,
      technologies,
      description,
      budget,
      contact_email,
    })
      .then((gig) => res.redirect("/gigs"))
      .catch((err) => console.log(err));
  }
});

//gigs search
router.get("/search", (req, res) => {
  const { term } = req.query;

  Gig.findAll({ raw:true, where: { technologies: { [Op.like]: "%" + term + "%" } } })
  .then(gigs => res.render('gigs', {gigs}))
  .catch(err => console.log(err));
});

module.exports = router;
