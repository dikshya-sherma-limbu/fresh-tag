const express = require("express");

const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const dbConnection = require("./config/dbConfig");
const userRoutes = require("./routes/userRoute");
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON data

// Connect to MongoDB
dbConnection();

// // Routes
app.use("/api/users", userRoutes);
// app.use("/api/labels", labelRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
