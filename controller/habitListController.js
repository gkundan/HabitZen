//

const Habit = require("../models/habitSchema");
//

exports.habitList = async (req, res) => {
  console.log(req.cookies.user_id);
  res.render("habitList", {
    title: "Habit Creation",
    habits: [],
  });
};

//adding new habit
exports.newHabit = async (req, res) => {
  const { name } = req.body;
  const user_id = req.cookies.user_id;

  try {
    const habit = await Habit.create({
      name: name,
      user: user_id,
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
