const express = require("express");
const User = require("../models/User");
const authRoutes = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
authRoutes.post("/register",async(req,res)=>{
    const {username,email,password} = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        res.json({
            status: "success",
            data: user
        })
    }catch(error){
        res.json(error.message)
    }
})

authRoutes.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.json("Invalid Credentials")
        }
        const pass = await bcrypt.compare(password,user.password);
        if(!pass){
            return res.json("Invalid Credentials")
        }
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },process.env.JWT_SEC,
        {expiresIn:"3d"}  
        )
        res.json({
            status: "success",
            message: "Logged in successfully",
            data: user,accessToken
        
        })
    }catch(error){
        res.json(error.message)
    }
})
module.exports = authRoutes