const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/userController");
const { authenticateUser } = require("../middlewares/authenticateUser"); // Import the authentication middleware
const router = express.Router();

// POST - Register a new user
router.post(
  "/register",
  [
    // Validation middleware
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

//POST - Login a user
router.post("/login", loginUser);

//POST - generate a expiy label

module.exports = router;
