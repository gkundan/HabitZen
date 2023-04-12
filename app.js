const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const habitRouts = require("./routes/habitRoutes");
const app = express();
const port = process.env.PORT || 3000;
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local").Strategy;
const passportLocal = require("./config/passportLocal");
const passport = require("passport");
const Noty = require("noty");

// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./assets"));
app.use(expressLayouts);
app.use(cookieParser());

//session
app.use(
  session({
    secret: "HabitTrain",
    resave: false,
    saveUninitialized: false,
  })
);

// Set up passport middleware
app.use(passport.initialize());
app.use(passport.session());
// initialize passport
passportLocal(passport);

// Connect to MongoDB
connectDB();

// Set up flash middleware
app.use(flash());

// Set up view engine
app.set("view engine", "ejs");

// Set up routes
app.use("/", habitRouts);

// Configure Noty.js defaults
Noty.overrideDefaults({
  layout: "topRight",
  timeout: 3000,
  theme: "bootstrap-v4",
  progressBar: true,
  animation: {
    open: "animated fadeIn",
    close: "animated fadeOut",
  },
});
// Set up middleware to pass Noty.js notifications to views
app.use((req, res, next) => {
  res.locals.notyMessages = req.flash("notyMessages");
  next();
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
