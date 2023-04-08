const User = require("../models/UserSchema");

exports.home = (req, res) => {
  res.render("Home", {
    title: "Welcome to Habit Zone",
  });
};

//user sign up
exports.createUser = async (req, res) => {
  try {
    //check the password
    if (req.body.password !== req.body["confirm-password"]) {
      console.log("Password Error!");
      return res.redirect("back");
    }

    //check the email is already in database
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("Email is already taken!");
      return res.redirect("back");
    }

    // create new user
    const newUser = await User.create(req.body);
    console.log("User created successfully!");
    return res.redirect("back");
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

//log in function
exports.logIn = async (req, res) => {
  try {
    // Find the user
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // Handle password
      if (user.password !== req.body.password) {
        return res.redirect("back");
      }

      // Handle session creation
      res.cookie("user_id", user.id);
      console.log(user.id);
      return res.redirect("/HabitList");
    } else {
      // Handle user not found
      return res.redirect("back");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
