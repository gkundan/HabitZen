const Habit = require("../models/habitSchema");
//
const flash = require("connect-flash");

// /rendering lists

exports.habitList = async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.session.userId) {
      return res.redirect("/sign-in");
    }

    // Retrieve habits for the logged-in user
    const habits = await Habit.find({ userId: req.session.userId });

    // Get the flash messages, if any
    const messages = req.flash("notyMessages");

    return res.render("habitList", {
      title: "Welcome to HabitZen",
      habits: habits,
      user: req.user,
      messages: messages, // pass the messages variable to the view
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// handle new creation
exports.newHabit = async (req, res) => {
  try {
    const userId = req.user._id;
    const habitData = { ...req.body, userId };
    const habit = new Habit(habitData);
    await habit.save();

    req.flash("notyMessages", {
      type: "success",
      text: "New habit added successfully!",
    });
    res.redirect("back");
  } catch (error) {
    console.log("Error in creating habit: ", error);
    req.flash("notyMessages", {
      type: "error",
      text: "Failed to create new habit.",
    });
    res.redirect("/habits");
  }
};

// Handle habit delete on POST

exports.deleteHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);

    if (!habit) {
      res.status(404).send("Habit not found");
      return;
    }

    req.flash("success", "Deleted habit with id " + req.params.id);
    res.redirect("back");
  } catch (err) {
    next(err);
  }
};

///log
exports.habit_log_get = async (req, res, next) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).send("Habit not found");
    }
    res.render("habit_log", { title: "Habit Log", habit });
  } catch (err) {
    next(err);
  }
};

//log creation
exports.log_create = async (req, res) => {
  const habitId = req.params.habitId;
  const action = req.body.action;
  const date = req.body.date;

  try {
    const habit = await Habit.findById(habitId);
    if (!habit) {
      res.status(404).send("Habit not found");
      return;
    }

    const entry = {
      action,
      date: new Date(date),
    };
    habit.log.push(entry);
    const updatedHabit = await habit.save();

    res.redirect("back");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating habit");
  }
};

//log update
// Update habit log entry
exports.log_update = async (req, res) => {
  const habitId = req.params.habitId;
  const entryId = req.params.entryId;
  const status = req.body.status;

  try {
    const habit = await Habit.findById(habitId);
    if (!habit) {
      res.status(404).send("Habit not found");
      return;
    }

    const entry = habit.log.id(entryId);
    if (!entry) {
      res.status(404).send("Log entry not found");
      return;
    }

    entry.status = status;
    const updatedHabit = await habit.save();

    res.redirect("back");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating log entry");
  }
};
