const User = require("../models/user");

class UserRepository {
  // Find a user by email
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  // Save a new user to the database
  async saveUser(user) {
    return await user.save();
  }

  // Find a user by ID
  async findById(id) {
    return await User.findById(id);
  }
}

module.exports = new UserRepository();
