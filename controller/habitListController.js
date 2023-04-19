const Habit = require("../models/habitSchema");
const moment = require("moment");

// Controller function to render the list of habits
exports.habitList = async (req, res, next) => {
  try {
    // Check if user is logged in
    if (!req.session.userId) {
      return res.redirect("/sign-in");
    }

    // Retrieve habits for the logged-in user
    const habits = await Habit.find({ userId: req.session.userId });

    return res.render("habitList", {
      title: "My Habits",
      habits: habits,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Controller function to handle creating a new habit
exports.newHabit = async (req, res) => {
  try {
    if (!req.user) {
      // If user is not authenticated, redirect to login page
      return res.redirect("/login");
    }

    const userId = req.user._id;
    const habitData = { ...req.body, userId };
    const habit = new Habit(habitData);
    await habit.save();

    res.redirect("back");
  } catch (error) {
    console.error(error);
    res.redirect("back");
  }
};

// Controller function to handle deleting a habit
exports.deleteHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);

    if (!habit) {
      return res.status(404).send("Habit not found");
    }

    res.redirect("back");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Controller function to render the habit log page
exports.habitLog = async (req, res, next) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).send("Habit not found");
    }

    const entries = habit.log.map((entry) => ({
      title:
        entry.action === "Done" ? "✓" : entry.action === "Not Done" ? "X" : "-",
      start: moment(entry.date).toDate(),
      end: moment(entry.date).add(1, "days").toDate(),
    }));

    const log = entries.map((entry) => ({
      title: `${habit.name} - ${habit.category} - ${entry.title}`,
      start: entry.start,
      className:
        entry.title === "✓"
          ? "done"
          : entry.title === "X"
          ? "not-done"
          : "no-action",
    }));

    console.log("Habit Log From Controller", log);
    res.render("habit_log", {
      title: `${habit.category} Log`,
      habit,
      log,
      moment,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Controller function to add a new habit log entry// Controller function to add a new habit log entry
exports.addHabitLog = async (req, res, next) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).send("Habit not found");
    }

    const { date, action } = req.body;
    const logEntry = {
      action,
      date: moment(date).toDate(),
    };

    // Check if an entry already exists for the given date
    const existingEntry = habit.log.find((entry) =>
      moment(entry.date).isSame(moment(date), "day")
    );
    if (existingEntry) {
      return res.status(400).send("An entry already exists for this date");
    }

    habit.log.push(logEntry);
    await habit.save();

    res.redirect(`/habit/${habit._id}/log`);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
