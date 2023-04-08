const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      value: {
        type: String,
        enum: ["Done", "Not Done", "None"],
        default: "None",
      },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
