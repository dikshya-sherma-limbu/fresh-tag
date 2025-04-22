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
    res.json({ token });
  } catch (err) {
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
};
