const Label = require("../models/label");

const LabelRepository = () => {
  //save a new label to the database
  const saveLabel = async (label) => {
    try {
      await label.save();
      return label;
    } catch (err) {
      console.error("Error saving label:", err);
      throw new Error("Failed to save label: " + err.message);
    }
  };

  //get all labels for a user
  const getAllLabels = async (userId) => {
    //gets all labels for a user
    const labels = await Label.find({ user: userId });
    if (!labels) {
      throw new Error("No labels found for this user");
    }
    return labels;
  };

  //get a label by foodName
  const getLabelByFoodName = async (foodName) => {
    //gets a label by foodName
    const label = await Label.findOne({ foodName });
    console.log("label", label);
    if (!label) {
      throw new Error("Label not found");
    }
    return label;
  };

  //delete a label by foodName
  const deleteLabelByFoodName = async (foodName) => {
    //deletes a label by foodName
    const label = await Label.findOneAndDelete({ foodName });
    if (!label) {
      throw new Error("Label not found");
    }
    return label;
  };

  // get labels with custom crieteria
  const findLabels = async (criteria) => {
    return await Label.find(criteria).sort({ bestBefore: 1 }); // find labels based on criteria and sort by bestBefore date
  };

  return {
    saveLabel,
    getAllLabels,
    getLabelByFoodName,
    deleteLabelByFoodName,
    findLabels,
  };
};

module.exports = LabelRepository();
