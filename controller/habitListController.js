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
  const { name } = req.body;
  const user_id = req.cookies.user_id;
  console.log(user_id);
  try {
    const habit = await Habit.create({
      name: name,
      user: user_id, // use user instead of userId
      status: {
        Monday: "None",
        Tuesday: "None",
        Wednesday: "None",
        Thursday: "None",
        Friday: "None",
        Saturday: "None",
        Sunday: "None",
      },
    });
    console.log("New habit added: ", habit);
    res.redirect("/habitList");
  } catch (err) {
    console.log("Error in creating habit: ", err);
    return res.redirect("back");
  }
};
