const express = require("express");
const router = express.Router();
const habitController = require("../controller/habitConroller");
const habitListController = require("../controller/habitListController");
const { ensureAuthenticated } = require("../config/auth");

// Define the routes for handling habit-view related requests
router.get("/", habitController.home);
router.get("/sign-in", habitController.signIn);
router.get("/HabitList", ensureAuthenticated, habitListController.habitList);

// Define the routes for handling habit-post related requests
router.post("/create-user", habitController.createUser);
router.post("/signIn-user", habitController.logIn);
router.post("/habit/create", habitListController.newHabit);

// Export the router for use in the app
module.exports = router;
