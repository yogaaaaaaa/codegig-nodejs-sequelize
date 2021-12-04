const express = require("express");
const { engine } = require("express-handlebars");
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

//routes====================================
app.use("/gigs", gigsRoute);

//set static folder =========================
app.use(express.static(path.join(__dirname, "public")));

//body parser================================
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(bodyParser.json())

//Handlebars================================
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Index Route=====================================
app.get("/", (req, res) => {
  res.render("index", { defaultLayout: "landing" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
