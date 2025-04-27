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
        });
    }
  },

  // Get all labels for a user
  getAllLabels: async (req, res) => {
    try {
      const userId = req.user.id; // Get user ID from authenticated request
      // Call service to get all labels for the user
      const allLabels = await LabelService.getAllLabels(userId);
      // Check if labels exist
      if (!allLabels || allLabels.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No labels found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Labels fetched successfully",
        data: allLabels,
      });
    } catch (error) {
      console.error("Error in getAllLabels controller:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch labels",
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
      });
    }
  },

  // Get all expired labels for a user
  getExpiredLabels: async (req, res) => {
    try {
      const userId = req.user.id; // Get user ID from authenticated request
      const expiredLabels = await LabelService.getExpiredLabels(userId); // Call service to get expired labels
      // Check if expired labels exist
      if (!expiredLabels || expiredLabels.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No expired labels found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Expired labels fetched successfully",
        data: expiredLabels,
      });
    } catch (error) {
      console.error("Error in getExpiredLabels controller:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch expired labels",
      });
    }
  },

  //get all active labels for a user
  getActiveLabels: async (req, res) => {
    try {
      const userId = req.user.id; // Get user ID from authenticated request
      const activeLabels = await LabelService.getActiveLabels(userId); // Call service to get active labels
      // Check if active labels exist
      if (!activeLabels || activeLabels.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No active labels found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Active labels fetched successfully",
        data: activeLabels,
      });
    } catch (error) {
      console.error("Error in getActiveLabels controller:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch active labels",
      });
    }
  },
};

module.exports = LabelController;
