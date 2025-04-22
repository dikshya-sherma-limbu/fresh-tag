const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const dbConnection = require("./config/dbConfig");
const userRoutes = require("./routes/userRoute");
const labelRoutes = require("./routes/labelRoute");
const cors = require("cors");
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON data

// Enable CORS for all routes
app.use(
  cors({
    origin: "exp://192.168.2.180:8081" || "*" || "http://localhost:8081", // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Connect to MongoDB
dbConnection();

// // Routes
app.use("/api/users", userRoutes);
app.use("/api/labels", labelRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
