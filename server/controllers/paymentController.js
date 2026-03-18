const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const Order = require("../models/Order");


// exports.createRazorpayOrder = async (req, res) => {
//   try {
//     const { productId, totalPrice } = req.body;

//     if (!totalPrice || totalPrice <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid total price",
//       });
//     }

//     const order = await Order.create({
//       userId: req.user.id,
//       productId,
//       totalPrice,
//       status: "pending",
//     });

//     const razorpayOrder = await razorpay.orders.create({
//       amount: Math.round(totalPrice * 100), 
//       currency: "INR",
//       receipt: `order_${order._id}`,
//     });

//     order.razorpayOrderId = razorpayOrder.id; 
//     await order.save();

//     return res.status(200).json({
//       success: true,
//       razorpayOrderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//     });
//   } catch (error) {
//     console.error("Create Razorpay Order Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Payment initiation failed",
//     });
//   }
// };

const Product = require("../models/Product");

exports.createRazorpayOrder = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Invalid product",
      });
    }

    const totalPrice = product.basePrice; 

    const order = await Order.create({
      userId: req.user.id,
      productId,
      totalPrice,
      status: "pending",
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalPrice * 100),
      currency: "INR",
      receipt: `order_${order._id}`,
    });

    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    return res.status(200).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
    });
  } catch (error) {
    console.error("Create Razorpay Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment initiation failed",
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // 1️⃣ Generate expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    // 2️⃣ Compare signatures
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // 3️⃣ Update order status
    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = "paid";
    order.razorpayPaymentId = razorpay_payment_id;

    await order.save();

    res.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};


exports.paymentFailed = async (req, res) => {
  try {
    const { razorpay_order_id, reason } = req.body;

    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = "failed";
    order.failureReason = reason || "Payment failed";

    await order.save();

    res.json({
      success: true,
      message: "Payment failure recorded",
    });
  } catch (error) {
    console.error("Payment Failed Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to record payment failure",
    });
  }
};
