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
    console.log("Repository received id:", id, typeof id);
    // Make sure we're using a string ID
    if (typeof id === "object" && id !== null) {
      console.error(
        "Warning: Repository received an object instead of an ID string!"
      );
      if (id.id) {
        console.log("Using id.id instead:", id.id);
        id = id.id;
      }
    }
    return await User.findById(String(id)).select("username email");
  }
}

module.exports = new UserRepository();
