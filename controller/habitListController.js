//

const Habit = require("../models/habitSchema");
//

exports.habitList = async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.session.userId) {
      return res.redirect("/sign-in");
    }

    // Retrieve habits for the logged-in user
    const habits = await Habit.find({ userId: req.session.userId });
    console.log("user_id from the render HabitList", req.user._id);
    return res.render("habitList", {
      title: "Welcome to HabitZen",
      habits: habits,
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//adding new habit
exports.newHabit = async (req, res) => {
  try {
    const userId = req.user._id; // get the user ID from the authenticated user
    const habitData = { ...req.body, userId }; // add the user ID to the habit data
    const habit = new Habit(habitData);
    console.log(habit);
    await habit.save();
    res.status(201).json({ habit });
  } catch (error) {
    console.log("Error in creating habit: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
