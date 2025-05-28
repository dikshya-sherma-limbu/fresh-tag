const express = require("express");
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  getUserById,
  validateUserToken,
  updateUser,
} = require("../controllers/userController");
const authenticateUser = require("../middlewares/authenticateUser"); // Import the authentication middleware

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

//POST - Validate the user token
router.get("/authenticate-user", authenticateUser, validateUserToken);

//GET - Get user details by ID
router.get("/user-details", authenticateUser, getUserById);

// PUT - Update user details
router.put(
  "/update-user",
  authenticateUser,
  [
    body("username")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Please enter a valid email address"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  updateUser
);

module.exports = router;
