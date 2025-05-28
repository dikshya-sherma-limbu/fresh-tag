// utils/jwtUtils.js
const jwt = require("jsonwebtoken");

// Function to generate a JWT token
const generateToken = (userId, tokenVersion) => {
  try {
    const token = jwt.sign(
      { id: userId, tokenVersion }, // Include user ID and token version in the payload
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
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
