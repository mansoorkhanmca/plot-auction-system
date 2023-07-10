
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.collection");

router.post("/register", async (req, res) => {
    try {
      const { firstName, lastName, email, password, gender , mobileNo, address, city, state } = req.body;
  
      if (!(email && password && firstName && lastName && gender && mobileNo)) {
        res.status(400).json({"message":"Required filelds are missing"});
      }
  
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).json({"message":"User Already Exist. Please Login"});
      }
  
      const encryptedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        firstName,
        lastName,
        gender,
        address,
        mobileNo,
        city,
        state,
        email: email.toLowerCase(), 
        password: encryptedPassword
      });
  
      const token = jwt.sign(
        { user_id: user._id, email },
        'TOKEN_KEY',
        {
          expiresIn: "2h",
        }
      );
  
      user.token = token;
  
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  });
  
  router.post("/login", async (req, res) => {
    try {
      
      const { email, password } = req.body;
  
      if (!(email && password)) {
        res.status(400).json({"message":"All input are required"});
      }
      
      let user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        
        const token = jwt.sign(
          { user_id: user._id, email },
          'TOKEN_KEY',
          {
            expiresIn: "2h",
          }
        );
  
        res.status(200).json({...user._doc,'token':token,'success':'true'});
      }
      res.status(400).json({"message":"Invalid Credentials"});
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;

