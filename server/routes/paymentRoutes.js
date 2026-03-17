const express = require("express");
const router = express.Router();

const {
  createRazorpayOrder,
  verifyPayment,
  paymentFailed
} = require("../controllers/paymentController");

const auth = require("../middleware/auth");


router.post("/create-order", auth, createRazorpayOrder);
router.post("/verify", auth, verifyPayment);
router.post("/failed",auth,paymentFailed)

module.exports = router;
