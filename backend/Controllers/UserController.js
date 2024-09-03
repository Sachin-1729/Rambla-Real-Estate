const User = require('../Models/Usermodel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

exports.getStaticRoute101 = (req, res) => {
    res.status(200).send('This is user 101 route');
};

exports.getStaticRoute102 = (req, res) => {
    res.status(200).send('This is user 102 route');
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || password !== user.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '30s' });

 
        res.status(200).json({ token:token,user:user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role_id } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            role_id
        }); 
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    } 
}; 

exports.getAllUsers = async (req, res) => {
    try {
        let users = [];
        const loggedInUserId = req.user._id; 
          // Find all users except the logged-in user
          if(req.query.role_id){
            users= await User.find({ _id: { $ne: loggedInUserId },role_id:req.query.role_id }).populate("role_id");
          }else{

      
         users = await User.find({ _id: { $ne: loggedInUserId } }).populate("role_id");
    }
        res.status(200).json({ users });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await User.deleteOne({ _id: userId });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const updates = req.body;

        const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.me = async (req, res) => {
    res.status(200).json({ user: req.user });
};



exports.deleteMultiUsers = async (req, res) => {
    try {
        const { ids } = req.body; // IDs ko body se receive karte hain
        console.log(ids);

        // Check karein ki ids array valid hai ya nahi
        if (!Array.isArray(ids) || ids.length === 0 || !ids.every(id => mongoose.Types.ObjectId.isValid(id))) {
            return res.status(400).json({ message: "Invalid or empty IDs array" });
        }

        // Multiple users ko delete karna
        const result = await User.deleteMany({ _id: { $in: ids.map(id => new mongoose.Types.ObjectId(id)) } });
        res.status(200).json({ message: "Users deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


