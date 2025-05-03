const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  console.log("Token received:", token); // Log the token for debugging
  const secretKey = process.env.JWT_SECRET;
  console.log("Secret key:", secretKey); // Log the secret key for debugging
  if (!secretKey) {
    return res.status(500).json({ message: "Server error: No secret key" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Log the decoded token for debugging
    req.user = decoded; // Store user details in request object
    next(); // Proceed to next middleware - means user is authenticated
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

module.exports = authenticateUser;
