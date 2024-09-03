const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }, 
    token: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema, 'forgotpassword');
module.exports = ForgotPassword;
