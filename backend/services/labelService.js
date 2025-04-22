const LabelRepository = require("../repositories/labelRepository");
const UserRepository = require("../repositories/userRepository");
const Label = require("../models/label");

const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

// API key for Gemini
const apiKey = process.env.GEMINI_API_KEY;
const modelId = process.env.GEMINI_MODEL_ID;
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/${modelId}:generateContent?key=${apiKey}`;

const LabelService = {
  // Create a new label
  createLabel: async ({
    userId,
    foodName,
    storageMethod,
    preparationDate,
    preservative,
    packageType,
  }) => {
    // Check if user exists
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User does not exist");
    }

    try {
      // Call the Gemini API to generate the label
      const response = await axios.post(
        apiUrl,
        {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Generate a food storage label with the following details:
                  Food Name: ${foodName}
                  Preparation Date: ${preparationDate}
                  Preservative: ${preservative}
                  Package Type: ${packageType}
                  Storage Method: ${storageMethod},
                                  
                  Return the response in the following strict JSON format:
                  {
                    "foodName": "string",
                    "bestBefore": "string",
                    "additionalInfo": "string"
                  }`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Gemini API Response:", response.data);
      // Check if response has the expected structure
      if (
        !response.data ||
        !response.data.candidates ||
        !response.data.candidates[0] ||
        !response.data.candidates[0].content ||
        !response.data.candidates[0].content.parts ||
        !response.data.candidates[0].content.parts[0].text
      ) {
        throw new Error("Unexpected response format from Gemini API");
      }

      // Extract the model's response
      let modelResponseText = response.data.candidates[0].content.parts[0].text;
      console.log("Model Response Text:", modelResponseText);
      modelResponseText = modelResponseText.replace(/```json|```/g, "").trim();
      console.log("Cleaned Model Response Text:", modelResponseText);

      const modelResponse = JSON.parse(modelResponseText);

      const label = new Label({
        user: userId,
        foodName: modelResponse.foodName,
        bestBefore: modelResponse.bestBefore,
        additionalInfo: modelResponse.additionalInfo,
      });

      // Save the label to the database
      await LabelRepository.saveLabel(label);

      return {
        id: label._id,
        foodName: label.foodName,
        bestBefore: label.bestBefore,
        additionalInfo: label.additionalInfo,
      };
    } catch (err) {
      console.error("Error generating label:", err);
      throw new Error("Failed to generate food expiry label: " + err.message);
    }
  },

  // Get all labels for a user
  getAllLabels: async (userId) => {
    // Check if user exists
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User does not exist");
    }

    // Get all labels for the user
    const labels = await LabelRepository.getAllLabels(userId);
    return labels;
  },

  // Get a label by foodName
  getLabelByFoodName: async (foodName) => {
    const label = await LabelRepository.getLabelByFoodName(foodName);
    return label;
  },
  // Delete a label by foodName
  deleteLabelByFoodName: async (foodName) => {
    const label = await LabelRepository.deleteLabelByFoodName(foodName);
    return label;
  },
};

module.exports = LabelService;
