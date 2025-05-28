// controllers/userController.js
const userService = require("../services/userService");
const { validationResult } = require("express-validator");
// Register User
const registerUser = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password } = req.body;

  try {
    // Call the service layer to register the user
    const { user, token } = await userService.registerUser({
      username,
      email,
      password,
    });

    // Send the response with the generated token and user info
    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: user._id,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await userService.loginUser({ email, password });

    console.log("login success", user);
    res.json({ token, username: user.username });
  } catch (err) {
    console.error("Login error:", err); // Log the error for debugging
    res.status(400).json({ message: err.message });
  }
};
const validateUserToken = async (req, res) => {
  return res.status(200).json({ message: "Token is valid", user: req.user }); // Send the user details if token is valid
};

// update user details
const updateUser = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the request object
  const userData = req.body; // Get the updated user data from the request body
  console.log("Controller userId:", userId, typeof userId);
  console.log("Controller userData:", userData, typeof userData);
  try {
    const { token, updatedUser } = await userService.updateUser(
      userId,
      userData
    );
    res.status(200).json({ token, updatedUser }); // Send the updated user details as a response
  } catch (err) {
    console.error("Controller error:", err);
    res.status(400).json({ message: err.message });
  }
};

//get user details by id
const getUserById = async (req, res) => {
  const userId = req.user.id;
  console.log("Controller userId:", userId, typeof userId);
  try {
    const user = await userService.getUserById(userId);
    res.status(200).json(user); // Send the user details as a response
  } catch (err) {
    console.error("Controller error:", err);
    res.status(400).json({ message: err.message });
  }
};

// const logoutUser = async (req, res) => {
//   try {
//     await userService.logoutUser();
//     res.json({ message: "Logged out successfully" });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
module.exports = {
  registerUser,
  loginUser,
  validateUserToken,
  getUserById,
  updateUser,
};
