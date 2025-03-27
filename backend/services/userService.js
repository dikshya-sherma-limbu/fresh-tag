const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

class UserService {
  // Register a new user
  async registerUser({ username, email, password }) {
    // Check if user already exists
    const userExists = await userRepository.findByEmail(email);
    if (userExists) {
      throw new Error("User already exists");
    }

    // Create a new user instance
    const user = new User({ username, email, password });

    // Save user to the database
    return await userRepository.saveUser(user);
  }
}

module.exports = new UserService();
