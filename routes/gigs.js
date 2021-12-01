const express = require("express");
const router = express.Router();
const db = require("../config/database.js");
const Gig = require("../models/Gig").Gig;

//Get gig list
router.get("/", (req, res) =>
  Gig.findAll()
    .then((gigs) => {
      console.log(gigs);
      res.sendStatus(200);
    })
    .catch((err) => console.log(err))
);

//Add a gig
router.get("/add", (req, res) => {
  const data = {
    title: "Wordpress Developer",
    technologies: "wordpress, html, Css, javascript",
    budget: "200000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    contact_email: "braun@gmail.com",
  };

  //   let {...spreadedData} = data;
  let { title, technologies, description, budget, contact_email } = data;

  //insert into table
  Gig.create({
    //   spreadedData
    title: title,
    technologies: technologies,
    description: description,
    budget: budget,
    contact_email: contact_email,
  })
    .then((gig) => res.redirect("/gigs"))
    .catch((err) => console.log(err));
});

module.exports = router;
