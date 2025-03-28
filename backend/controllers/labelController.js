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
};

module.exports = LabelController;
