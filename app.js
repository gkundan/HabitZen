const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const db = require("./config/db");
const habitRouts = require("./routes/habitRoutes");
const app = express();
const port = process.env.PORT || 3000;
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local").Strategy;
const passportLocal = require("./config/passportLocal");
const passport = require("passport");

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
mongoose
  .connect("mongodb://0.0.0.0:27017/HabitZen", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected :_:"))
  .catch((err) => console.log(err));

// Set up flash middleware
app.use(flash());

// Set up view engine
app.set("view engine", "ejs");

// Set up routes
app.use("/", habitRouts);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
