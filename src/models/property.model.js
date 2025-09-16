const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Property Title Is Required"],
    },
    description: {
      type: String,
      required: [true, "Property Description Is Required"],
    },
    location: {
      type: String,
      required: [true, "Property Location Is Required"],
    },
    price: {
      type: Number,
      required: [true, "Property Price Is Required"],
    },
    images: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Property Host Is Required"],
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
