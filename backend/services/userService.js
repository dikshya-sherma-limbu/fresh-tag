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
    const token = generateToken(user._id, user.tokenVersion); // Generate token with user ID and token version

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

    console.log("id sent to generate token", user._id);
    console.log("token version sent to generate token", user.tokenVersion);
    const token = generateToken(user._id, user.tokenVersion); // Generate token with user ID and token version

    return { token, user };
  },

  // Get user details by ID
  getUserById: async (id) => {
    console.log("Service getUserById called with:", id, typeof id);
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  // // // Logout a user
  // logoutUser: async ({user}) => {
  //   // Logout logic
  //   // This can vary depending on how you manage sessions or tokens

  // },
  // Update user details

  updateUser: async (id, userData) => {
    const user = await userRepository.findById(id);
    //If the data is email or username, check if the new value is already in use
    if ("email" in userData || "username" in userData) {
      // check if the new email or username is already in use the database
      const exisitingUsername = await userRepository.findByUsername(
        userData.username
      );
      const exisitingEmail = await userRepository.findByEmail(userData.email);
      if (exisitingUsername) {
        throw new Error("Username already in use");
      }
      if (exisitingEmail) {
        throw new Error("Email already in use");
      }
    }
    user.tokenVersion = (user.tokenVersion || 0) + 1; // Increment the token version to expire the old token
    // Hash the password if it is being updated
    console.log("token version before update", user.tokenVersion);
    const updatedUser = await userRepository.updateUser(id, userData);
    if (!updatedUser) {
      throw new Error("Failed to update user");
    }

    // expire the old token
    const token = generateToken(id, user.tokenVersion); // Generate a new token after updating user details
    return { token, updatedUser };
  },
};

module.exports = UserService;
