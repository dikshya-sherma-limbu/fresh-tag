// controllers/userController.js
const { generateToken } = require("../utils/jwtUtils"); // Import the JWT utility
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
    const user = await userService.registerUser({ username, email, password });

    const token = generateToken(user._id); // Generate a token

    // Send the response
    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: user._id,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  registerUser,
};
// // Login User
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     // Use the generateToken function to create the token
//     const token = generateToken(user._id);

//     res.json({ token, userId: user._id });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Logout User
// router.post("/logout", (req, res) => {
//   res.json({ message: "Logged out successfully" });
// });
