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
}

module.exports = new UserRepository();
