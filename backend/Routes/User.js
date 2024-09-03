// const express = require('express');
// const router = express.Router();
// const User = require('../Models/Usermodel');
// //const bcrypt = require('bcrypt');
// const verifyToken = require('../Middleware/Verify_token');
// const mongoose = require('mongoose'); // Include mongoose for ObjectId validation
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = 'your_secret_key';


// // Example static routes
// router.get('/101', (req, res) => {
//     res.status(200).send('This is user 101 route');
// });

// router.get('/102', (req, res) => {
//     res.status(200).send('This is user 102 route');
// });

// // Login
// router.post("/login", async (req, res) => { 
//     try {
//         const { email, password } = req.body;
//         console.log(email, password);

//         // Find the user by email
//         const user = await User.findOne({ email });
        
//         //console.log("User Password: ",user.password);

        

//         // Check if user exists
//         if (!user) {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         // Check if the password is correct
//      //  const isPasswordValid = await bcrypt.compare(password, user.password);

//         if ((password!==user.password)&&user.password!=null) {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         // If the email and password are correct, return the user data
//         const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

//         res.status(200).json({ token });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: error.message });
//     }
// });

// // Create a new user
// router.post("/", async (req, res) => {
//     try {
//         const { name, email, password, role_id } = req.body;
//      //   const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
//         const user = await User.create({
//             name,
//             email,
//             password, // Store hashed password
//             role_id
//         });
//         res.status(201).json({ user });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: error.message });
//     }
// });

// // Get all users
// router.get("/",async (req, res) => {
//     try {
//         const users = await User.find().populate("role_id");
//         res.status(200).json({ users });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: error.message });
//     }
// });

// // Get a user by ID
// router.get("/:id",async (req, res) => {
//     try {
//         const userId = req.params.id;

//         // Validate if userId is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid user ID format" });
//         }

//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json({ user });
//     } catch (error) {
//         console.log(error); 
//         res.status(400).json({ message: error.message });
//     }
// });

// // Delete a user by ID
// router.delete("/:id",async (req, res) => {
//     try {
//         const userId = req.params.id;

//         // Validate if userId is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid user ID format" });
//         }

//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         await User.deleteOne({ _id: userId });
//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: error.message });
//     }
// });

// // Update user details
// router.patch("/:id",async (req, res) => {
//     try {
//         const userId = req.params.id;

//         // Validate if userId is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid user ID format" });
//         }

//         const updates = req.body; // The updated user details from the request body

//         const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.status(200).json({ user });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: error.message });
//     }
// });

// module.exports = router;
