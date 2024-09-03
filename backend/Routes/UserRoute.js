const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');
const forgot = require('../Controllers/ForgotPasswordController');
const verifyToken = require('../Middleware/Verify_token');

// Routes without token verification
router.get('/101', userController.getStaticRoute101);
router.get('/102', userController.getStaticRoute102);
router.post("/login", userController.login);
router.post("/forgot-password", forgot.findUserByEmail);
router.post("/reset-password/:token", forgot.resetpassword);


// Routes with token verification 
router.post("/", verifyToken, userController.createUser);
router.get("/", verifyToken, userController.getAllUsers);
router.get("/:id", verifyToken, userController.getUserById);
router.delete("/:id", verifyToken, userController.deleteUserById);
router.patch("/:id", verifyToken, userController.updateUserById);
router.get("/auth/me", verifyToken, userController.me);

// New route for deleting multiple users
router.post("/multi-delete", userController.deleteMultiUsers);
module.exports = router;

