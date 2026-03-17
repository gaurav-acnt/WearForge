const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  baseImage: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  printArea: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
  },
  availableColors: [String],
  sizes: [String]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
