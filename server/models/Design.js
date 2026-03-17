const mongoose = require("mongoose");

const designSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  designJSON: {
    type: Object,
    required: true
  },
  previewImage: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Design", designSchema);
