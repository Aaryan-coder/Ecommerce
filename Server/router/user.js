const express = require("express");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const User = require("../models/User");
const userRoutes = express.Router();

userRoutes.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
   try{
    if(req.body.password){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        //update the user
        const user = await User.findByIdAndUpdate(req.user.id,{
            password: hashedPassword
        },{
            new: true,
            runValidators: true
        })
        res.json({
            status: 'success',
            data: user
        })
    }
    const user = await User.findByIdAndUpdate(req.user.id, req.body,{
        new: true,
        runValidators: true
    })
    res.json({
        status: 'success',
        data: user
    })
    //sedn the response
    
   }catch(error){
    res.json(error)
   }
})

//DELETE
userRoutes.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET USER
userRoutes.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET ALL USER
userRoutes.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

userRoutes.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = userRoutes