const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");
const {connectCloudinary} =require("./config/cloudinary")

const app = express();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
    credentials: true,
     allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const productRoutes= require("./routes/productRoutes")
const designRoutes = require("./routes/designRoutes")
const orderRoutes = require("./routes/orderRoutes")
const paymentRoutes = require("./routes/paymentRoutes")


app.use("/api/auth", authRoutes)
app.use("/api/products",productRoutes)
app.use("/api/designs",designRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/payment",paymentRoutes)


connectDB();
connectCloudinary();

app.get("/",(req,res)=>{
    res.send("Backend Running")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Backend running on port ${PORT}`))
