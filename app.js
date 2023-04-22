const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const habitRouts = require("./routes/habitRoutes");
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
app.use(flash());
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

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up routes
app.use((req, res, next) => {
  console.log("Routing");
  next();
});

app.use("/", habitRouts);
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
