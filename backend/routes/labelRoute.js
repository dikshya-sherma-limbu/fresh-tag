const express = require("express");

const { body } = require("express-validator");
const labelController = require("../controllers/labelController");
const authenticateUser = require("../middlewares/authenticateUser"); // Import the authentication middleware

const router = express.Router(); // Create a new router instance - why ?

router.use(authenticateUser); // Apply the authentication middleware to all routes in this router
// POST - Create a new label
router.post("/create-label", labelController.createLabel);

module.exports = router;
