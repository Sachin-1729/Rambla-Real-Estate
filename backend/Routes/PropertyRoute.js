const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/Verify_token');
const { upload, getAllProperties, createProperty, updateProperty, deleteProperty,getPropertyById,getAllListings,getSinglePropertyById  } = require('../Controllers/PropertyController');

// Apply multer middleware and then the controller
router.post('/store', verifyToken, upload.array('property_images', 5), createProperty);

// Test route for file uploads
// router.post('/upload-test', upload.array('property_images', 5), (req, res) => {
//     console.log('Files:', req.files);
//     res.json({ message: 'Files uploaded successfully!', files: req.files });
// });
// Update a property
router.patch('/store/:id', verifyToken, upload.array('property_images', 5), updateProperty);

// Delete a property
router.delete('/store/:id', verifyToken, deleteProperty);

// Route to get all properties
router.get('/', verifyToken, getAllProperties);

// Get a single property by ID
router.get('/store/:id', verifyToken, getPropertyById);

//Listing
router.get('/listing', getAllListings);

//Single Property
router.get('/listing/:id',  getSinglePropertyById );

module.exports = router;

 