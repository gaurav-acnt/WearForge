const Design = require("../models/Design");
const { cloudinary } = require("../config/cloudinary");

exports.createDesign = async (req, res) => {
  try {
    const { productId, designJSON } = req.body;

    if (!req.file || !designJSON || !productId) {
      return res.status(400).json({
        success: false,
        message: "Design data missing",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(
      `data:image/png;base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "custom-designs/previews",
      }
    );

    const design = await Design.create({
      userId: req.user.id,
      productId,
      designJSON: JSON.parse(designJSON),
      previewImage: uploadResult.secure_url,
    });

    return res.status(201).json({
      success: true,
      designId: design._id,
      previewImage: design.previewImage,
    });
  } catch (error) {
    console.error("Create design error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Design upload failed",
    });
  }
};







