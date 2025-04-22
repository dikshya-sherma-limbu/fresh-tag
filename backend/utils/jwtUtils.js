// utils/jwtUtils.js
const jwt = require("jsonwebtoken");

// Function to generate a JWT token
const generateToken = (userId) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    // Log the generated token for debugging purposes
    console.log("✅ Token generated successfully:", token);

    // Decode token without verification to see payload
    const decoded = jwt.decode(token);
    console.log("📋 Decoded token (unverified):", decoded);

    return token; // Return the generated token
  } catch (error) {
    console.error("❌ Error generating token:", error);
    throw new Error("Failed to generate token");
  }
};

module.exports = { generateToken };
