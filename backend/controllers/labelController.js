const { getLabelByFoodName } = require("../repositories/labelRepository");
const LabelService = require("../services/labelService");

const LabelController = {
  // Create a new label
  createLabel: async (req, res) => {
    try {
      const {
        foodName,
        storageMethod,
        preparationDate,
        preservative,
        packageType,
      } = req.body;
      const userId = req.user.id;
      // Validate required fields
      if (
        !foodName ||
        !storageMethod ||
        !preparationDate ||
        preservative === undefined ||
        !packageType
      ) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      // Call service to create label
      const label = await LabelService.createLabel({
        userId,
        foodName,
        storageMethod,
        preparationDate,
        preservative,
        packageType,
      });

      return res.status(201).json({
        success: true,
        message: "Label created successfully",
        data: label,
      });
    } catch (error) {
      console.error("Error in createLabel controller:", error);
      return res
        .status(error.message.includes("User does not exist") ? 404 : 500)
        .json({
          success: false,
          message: error.message || "Failed to create label",
          error: error.message,
        });
    }
  },

  // Get all labels for a user
  getAllLabels: async (req, res) => {
    try {
      const userId = req.user.id; // Get user ID from authenticated request
      // Call service to get all labels for the user
      const allLabels = await LabelService.getAllLabels(userId);
      // Return standard response format with empty array if no labels
      return res.status(200).json({
        success: true,
        message:
          allLabels.length > 0
            ? "Labels fetched successfully"
            : "No labels found",
        data: allLabels || [],
      });
    } catch (error) {
      console.error("Error in getAllLabels controller:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch labels",
        error: error.message,
      });
    }
  },

  // Get a label by foodName
  getLabelByFoodName: async (req, res) => {
    try {
      const foodName = req.params.foodName; // Get foodName from request parameters
      // Call service to get label by foodName
      const label = await LabelService.getLabelByFoodName(foodName);
      // Check if label exists
      if (!label) {
        return res.status(404).json({
          success: false,
          message: "Label not found",
          data: null,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Label fetched successfully",
        data: label,
      });
    } catch (error) {
      console.error("Error in getLabelByFoodName controller:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch label",
        error: error.message,
      });
    }
  },
  // Delete a label by foodName
  deleteLabelByFoodName: async (req, res) => {
    try {
      const foodName = req.params.foodName; // Get foodName from request parameters
      // Call service to delete label by foodName
      const deletedLabel = await LabelService.deleteLabelByFoodName(foodName);
      // Check if label exists
      if (!deletedLabel) {
        return res.status(404).json({
          success: false,
          message: "Label not found",
          data: null,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Label deleted successfully",
        data: deletedLabel,
      });
    } catch (error) {
      console.error("Error in deleteLabelByFoodName controller:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete label",
        error: error.message,
      });
    }
  },

  // Get all expired labels for a user
  getExpiredLabels: async (req, res) => {
    try {
      const userId = req.user.id; // Get user ID from authenticated request
      const expiredLabels = await LabelService.getExpiredLabels(userId); // Call service to get expired labels

      // Return standard response format with empty array if no labels
      return res.status(200).json({
        success: true,
        message:
          expiredLabels.length > 0
            ? "Expired labels fetched successfully"
            : "No expired labels found",
        data: expiredLabels || [],
      });
    } catch (error) {
      console.error("Error in getExpiredLabels controller:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch expired labels",
        error: error.message,
      });
    }
  },

  //get all active labels for a user
  getActiveLabels: async (req, res) => {
    try {
      const userId = req.user.id; // Get user ID from authenticated request
      const activeLabels = await LabelService.getActiveLabels(userId); // Call service to get active labels

      // Return standard response format with empty array if no labels
      return res.status(200).json({
        success: true,
        message:
          activeLabels.length > 0
            ? "Active labels fetched successfully"
            : "No active labels found",
        data: activeLabels || [],
      });
    } catch (error) {
      console.error("Error in getActiveLabels controller:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch active labels",
        error: error.message,
      });
    }
  },

  // Get current date labels for a user
  getCurrentDateLabels: async (req, res) => {
    try {
      const userId = req.user.id; // Get user ID from authenticated request
      const currentDateLabels = await LabelService.getCurrentDateLabels(userId); // Call service to get current date labels

      // Return standard response format with empty array if no labels
      return res.status(200).json({
        success: true,
        message:
          currentDateLabels.length > 0
            ? "Current date labels fetched successfully"
            : "No current date labels found",
        data: currentDateLabels || [],
      });
    } catch (error) {
      console.error("Error in getCurrentDateLabels controller:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch current date labels",
        error: error.message,
      });
    }
  },

  //Get recent labels for a user - today and yesterday
  getRecentLabels: async (req, res) => {
    try {
      const userId = req.user.id; // Get user ID from authenticated request
      const recentLabels = await LabelService.getRecentLabels(userId); // Call service to get recent labels

      // Return standard response format with empty array if no labels
      return res.status(200).json({
        success: true,
        message:
          recentLabels.length > 0
            ? "Recent labels fetched successfully"
            : "No recent labels found",
        data: recentLabels || [],
      });
    } catch (error) {
      console.error("Error in getRecentLabels controller:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch recent labels",
        error: error.message,
      });
    }
  },
};

module.exports = LabelController;
