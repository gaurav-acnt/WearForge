const express = require("express");
const auth = require("../middleware/auth");
const { createDesign } = require("../controllers/designController");
const router = express.Router();
const upload = require("../middleware/upload")


router.post("/",auth,upload.single("previewImage"), createDesign)


module.exports = router;

