// middlewares/verifyToken.js
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";
const User = require("../Models/Usermodel");

const verifyToken = async (req, res, next) => {
   
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }
  
  try {
    // Split the Bearer part from the actual token
    const token = authHeader.split(" ")[1];
  
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, no token" });
  }

  
};

module.exports = verifyToken;
