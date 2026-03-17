const Product = require("../models/Product");
const {cloudinary} = require("../config/cloudinary");

exports.createProduct = async (req, res) => {
  try {
    const { name, basePrice, printArea } = req.body;

    if (!name || !basePrice) {
      return res.status(400).json({
        success: false,
        message: "Name and basePrice are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "custom-designs/products",
        resource_type: "image",
      }
    );

    let parsedPrintArea = null;
    if (printArea) {
      parsedPrintArea =
        typeof printArea === "string" ? JSON.parse(printArea) : printArea;
    }

    const product = await Product.create({
      name,
      basePrice,
      baseImage: uploadResult.secure_url,
      printArea: parsedPrintArea,
    });

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req,res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product)
            return res.status(400).json({
                success:false,
                message:"Product Not Found"
            })
        return res.status(200).json({
            success:true,
            message:"Product Deleted"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Delete Failed"
        })
    }
}

exports.getAllProducts = async(req,res)=> {
    try{
        const products = await Product.find().sort({createdAt: -1})
        return res.status(200).json({
            success:true,
            products
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Fetch Failed"
        })
    }
}

exports.getProduct = async(req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product)
            return res.status(400).json({
                success:false,
                message:"Product Not Found"
            })
        return res.status(200).json({
            success:true,
            product
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message, 
        })
    }
}
