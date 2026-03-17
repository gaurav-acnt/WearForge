const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/isAdmin");
const { createProduct, updateProduct, deleteProduct, getAllProducts, getProduct } = require("../controllers/productController");
const upload = require("../middleware/upload");
const router = express.Router();

router.post(
  "/",
  auth,
  admin,
  upload.single("image"),
  createProduct
);

router.put("/:id",auth,admin,updateProduct);
router.delete("/:id",auth,admin,deleteProduct);

router.get("/",getAllProducts);
router.get("/:id",getProduct)

module.exports = router;