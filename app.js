const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./config/database.js");

//import routes=========================================
const app = express();
const gigsRoute = require("./routes/gigs.js");

//DB test if connected
db.authenticate()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//routes=================================
app.use("/gigs", gigsRoute);

//tHome Route=====================================
app.get("/", (req, res) => {
  res.send("INDEX");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
