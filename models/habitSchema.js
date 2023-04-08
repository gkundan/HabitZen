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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Habit = mongoose.model("Habit", habitSchema);
