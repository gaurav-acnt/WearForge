const express = require("express");
const auth = require("../middleware/auth");
const { createOrder, getMyOrders,getAllOrders, updateOrderStatus } = require("../controllers/orderController");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();

router.post("/",auth,createOrder);
router.get("/my-orders",auth,getMyOrders);
router.get("/", auth, isAdmin, getAllOrders);  
router.put("/:id",auth,isAdmin,updateOrderStatus);

module.exports = router;


