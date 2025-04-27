const express = require("express");

const { body } = require("express-validator");
const labelController = require("../controllers/labelController");
const authenticateUser = require("../middlewares/authenticateUser"); // Import the authentication middleware

const router = express.Router(); // Create a new router instance - why ?

router.use(authenticateUser); // Apply the authentication middleware to all routes in this router
// POST - Create a new label
router.post("/create-label", labelController.createLabel);

// GET - Get all labels
router.get("/all-labels", labelController.getAllLabels);
// GET - Get a label by food name
router.get("/label/:foodName", labelController.getLabelByFoodName);
// DELETE - Delete a label by food name
router.delete("/label/:foodName", labelController.deleteLabelByFoodName);

// GET - Get all expired labels for a user
router.get("/expired-labels", labelController.getExpiredLabels);
// GET - Get all active labels for a user
router.get("/active-labels", labelController.getActiveLabels);

//GET - Get current date labels for a user
router.get("/current-date-labels", labelController.getCurrentDateLabels);

//GET - Get recent labels for a user
router.get("/recent-labels", labelController.getRecentLabels);

module.exports = router;
