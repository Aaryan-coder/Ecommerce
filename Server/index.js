const express = require("express")
const mongoose = require("mongoose")
const app = express();
const dotenv = require("dotenv");
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const productRoutes = require("./router/product");
const cartRoutes = require("./router/cart");
const orderRoutes = require("./router/order");
const cors = require("cors");
const stripeRouter = require("./router/stripe");

dotenv.config()
const db = async()=>{
   try{
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log("DB Connected successfully")   
}catch(error){
    console.log("DB connection failed")
   } 
}
db()
app.use(cors())
app.use(express.json())
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/products",productRoutes)
app.use("/api/v1/cart",cartRoutes)
app.use("/api/v1/user",orderRoutes)
app.use("/api/v1/checkout",stripeRouter)
app.listen(process.env.PORT || 9000,()=>{
    console.log("Server is up and running")
})