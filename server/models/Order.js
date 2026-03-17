const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    designId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Design",
    },

    quantity: {
      type: Number,
      default: 1,
    },

    razorpayOrderId: {
      type: String,
    },

    razorpayPaymentId: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "shipped", "delivered"],
      default: "pending",
    },

    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
