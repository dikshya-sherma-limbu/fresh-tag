const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  bestBefore: {
    type: Date,
    required: true,
  },
  additionalInfo: {
    type: String,
    required: true,
  },
});

const Label = mongoose.model("GeneratedLabel", labelSchema);

module.exports = Label;
