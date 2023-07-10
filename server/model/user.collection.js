const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { 
    type: String, 
    required: [true, "can't be blank"], 
    match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'is invalid']
    ,index: { unique: true } 
  },
  password: { 
    type: String, 
    required: [true, "can't be blank"] 
  },
  firstName: {
    type: String, 
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z]+$/, 'is invalid']
  },
  lastName: {
    type: String, 
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z]+$/, 'is invalid']
  },
  gender:{
    type: String, 
    required: [true, "can't be blank"]
  },
  mobileNo:{
    type: String, 
    required: [true, "can't be blank"]
  },
  address:{
    type: String
  },
  city:{
    type: String
  },
  state:{
    type: String
  }
});

module.exports = model("user", userSchema);
