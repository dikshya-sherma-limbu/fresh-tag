const Label = require("../models/label");
const User = require("../models/user");

const LabelRepository = () => {
  //save a new label to the database
  const saveLabel = async (label) => {
    await label.save();
  };

  return {
    saveLabel,
  };
};

module.exports = LabelRepository();
