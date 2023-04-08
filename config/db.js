const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/HabitZen", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database!");
});

module.exports = db;
