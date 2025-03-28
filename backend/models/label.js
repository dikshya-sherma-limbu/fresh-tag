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
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
    required: true,
  },
  // storageMethod: {
  //   type: String,
  //   enum: ["fridge", "freezer", "pantry"],
  //   required: true,
  // },
  // preparationDate: {
  //   type: Date,
  //   required: true,
  // },
  // preservative: {
  //   type: Boolean,
  //   required: true,
  // },
  // packageType: {
  //   type: String,
  //   enum: [
  //     "airtight container",
  //     "plastic wrap",
  //     "ziploc",
  //     "open plate",
  //     "glass jar",
  //   ],
  //   required: true,
  // },
  // labelGenerated: {
  //   type: String, // You can store the label as an image URL or some other format
  //   required: true,
  // },
});

const Label = mongoose.model("GeneratedLabel", labelSchema);

module.exports = Label;
