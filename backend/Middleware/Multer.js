const multer = require('multer');
const path = require('path');
const Property = require('../Models/Propertymodel');
const mongoose = require('mongoose');


// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination where the files should be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set the filename as unique
    }
});
