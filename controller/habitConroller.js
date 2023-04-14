const User = require("../models/UserSchema");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

//home views
exports.home = (req, res) => {
  res.render("Home", {
    title: "Welcome to Habit Zone",
    message: "",
  });
};

//user sign up
exports.createUser = async (req, res) => {
  try {
    // check the password
    if (req.body.password !== req.body["confirm-password"]) {
      console.log("Password Error!");
      return res.redirect("back");
    }

    // check if the email is already in the database
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("Email is already taken!");
      return res.redirect("back");
    }

    // hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user with hashed password
    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });

    console.log("User created successfully!");
    return res.redirect("/sign-in");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//sing IN Page
exports.signIn = (req, res) => {
  res.render("sign_in", {
    title: "Welcome to Habit Zone",
  });
};

//user log in
exports.logIn = function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("back");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      // Set the user ID in the session
      req.session.userId = user._id;

      return res.redirect("/habitList");
    });
  })(req, res, next);
};

//google
exports.googleSignUp = (req, res) => {
  res.send("Update Incoming!!");
};
