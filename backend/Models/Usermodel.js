// User model
const mongoose = require("mongoose");
const Role = require('../Models/Role');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], // Email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be exactly 8 characters long'],
    maxlength: [8, 'Password must be exactly 8 characters long'],
  },
  role_id: {
    type: mongoose.Types.ObjectId,
    ref: Role,
    required: [true, 'Please select the role'],
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
