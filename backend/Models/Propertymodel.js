
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    property_name: {
        type: String,
        required: true,
    },
    property_address: {
        type: String,
        required: true,
    },
    property_images: [{
        type: String,
        required: true, // Ensure this is true only if it's mandatory
    }],
    tenant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    landlord_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amenities: [{
        type: String,
        required: true // Change this to an array of strings
    }],
    floor: {
        type: Number,
        required: true 
    }
}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema, "properties");
module.exports = Property;

