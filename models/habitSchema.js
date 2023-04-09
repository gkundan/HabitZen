const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
        enum: ["Done", "Not Done", "No Action"],
        default: "None",
      },
    },
  ],
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
