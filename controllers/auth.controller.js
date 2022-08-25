const express = require("express");
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User.model");
const nodemailer = require("nodemailer");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//signup

router.post("/register", 
  body("password").custom(async (value) => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(value)
     if(!regex){
      throw new Error("Password must consist of one special character and must start with capital letter")
     }
    
    }),
   
    async(req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let newErrors = errors.array().map(({ msg, param, location }) => {
          return {
            [param]: msg,
          };
        });
        return res.status(400).json({ errors: newErrors });
      }

  try {
    

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
      return res.status(400).json({
        status: "failed",
        message: " Please provide a different email address",
      });
    //create new user
    const newuser = await new User({
      //uid:req.body.uid,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashedPassword,
      role:req.body.role,
      status:req.body.status

     
    });

    const token = jwt.sign({newuser}, process.env.JWT_SECRET_KEY);
    //save user and response
    const user = await newuser.save();
   return res.status(200).json({message:"Account successfully created"});
  } catch (err) {
    console.log(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const {email,password,role}=req.body;
    const user = await User.findOne({ email: email });
    !user && res.status(404).json("user not found");
    if (!(email && password && role)) {
      res.status(400).send("All input is required");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );
    const validRole = await bcrypt.compare(
      role,
      user.role
    );
    if(!validPassword){
     return res.status(400).json("wrong password");

    }

    if(!validRole){
      return res.status(400).json("Unauthorised access");
 
     }

    const token = jwt.sign({user }, process.env.JWT_SECRET_KEY,"Stack",{expiresIn: '30d'});
    res.status(200).send({        
        status:200,
      message: "Logged in successfully",
      data: user,
      token: token
});
  } catch (err) {
    res.status(404).send("user not found");
    console.log(err);
  }
});



//User Details

router.post("/userDetail", async( req, res)=>{
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(' ')[1],
        decoded;
    try {
        decoded = jwt.verify(authorization, process.env.JWT_SECRET_KEY);
    } catch (e) {
        return res.status(401).send('unauthorized');
    }
    var userId = decoded.id;
    // Fetch the user by id 
    User.findOne({_id: id}).then(function(user){
        // Do something with the user
        return res.send(200);
    });
}
return res.send(500);
})


// Get all Users
router.get("/allUsers", async (req, res) => {
  try {
   
    const user = await User.find();
    const userData={first_name,email,mobile,status,role}=user
    
    res.status(200).send({        
        success:200,
    
      data: userData,
     
});
  } catch (err) {
    res.status(404).send("user not found");
    console.log(err);
  }
});




module.exports = router;
