const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");
const User = require("../models/user");
const { generateToken } = require("../utils/jwtUtils"); // Import the JWT utility

const UserService = {
  // Register a new user
  registerUser: async ({ username, email, password }) => {
    // Check if user already exists
    const userExists = await userRepository.findByEmail(email);
    if (userExists) {
      throw new Error("User already exists");
    }

    // Create a new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate JWT token after the user is saved
    const token = generateToken(user._id); // Token generated here

    return { user, token };
  },

  // Login a user
  loginUser: async ({ email, password }) => {
    // Check if user exists
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User does not exist");
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user._id); // Token generated here

    return { token, user };
  },

  // // Logout a user
  // logoutUser: async () => {
  //   // Logout logic

  // },
};

module.exports = UserService;
