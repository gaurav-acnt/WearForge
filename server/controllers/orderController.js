const Product = require("../models/Product");
const Design = require("../models/Design");
const calculatePrice = require("../utils/priceCalculator");
const Order = require("../models/Order");

exports.createOrder = async(req,res)=>{
    try{
        const {productId, designId, quantity,designArea,hasImage} = req.body;

        const product = await Product.findById(productId);
        const design = await Design.findById(designId);

        if(!product || !design)
            return res.status(400).json({
                success:false,
                message:"Invalid Product or Design"
            })

            const unitPrice = calculatePrice({
                basePrice:product.basePrice,
                designArea,
                hasImage
            })

            const totalPrice = unitPrice * (quantity || 1);

            const order = await Order.create({
                userId:req.user.id,
                productId,
                designId,
                quantity,
                totalPrice
            })
            return res.status(200).json({
                success:true,
                order
            })

    }catch(error){
        return res.status(500).json({
            success:false,
            message: error.message || "Order Creation Failed" 
        })
    }
}

exports.getMyOrders = async (req, res) => {
  try {
    let orders;

  
    if (req.query.all === "true" && req.user.role === "admin") {
      orders = await Order.find()
        .populate("userId", "email")
        .populate("productId")
        .populate("designId")
        .sort({ createdAt: -1 });
    } 

    else {
      orders = await Order.find({ userId: req.user.id })
        .populate("productId")
        .populate("designId")
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch orders",
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "email")
      .populate("designId")
      .populate("productId")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders",
    });
  }
};

exports.updateOrderStatus = async(req,res)=> {
    try{
        const {status} = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {status},
            {new:true}
        )
        if(!order)
            return res.status(400).json({
        success:false,
        message:"order not found"
    })
    return res.status(200).json({
        success:true,
        order
    })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Update Failed"
        })
    }
}


