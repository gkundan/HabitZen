const express = require("express");
const router = express.Router();
const habitController = require("../controller/habitConroller");
const habitListController = require("../controller/habitListController");
// Import the Habit model and any other required dependencies
// const Habit = require("../models/habit");

// Define the routes for handling habit-related requests
router.get("/", habitController.home);
router.get("/sign-in", habitController.signIn);
router.get("/HabitList", habitListController.habitList);

router.post("/create-user", habitController.createUser);
router.post("/signIn-user", habitController.logIn);
router.post("/habit/create", habitListController.newHabit);
// Export the router for use in the app
module.exports = router;
