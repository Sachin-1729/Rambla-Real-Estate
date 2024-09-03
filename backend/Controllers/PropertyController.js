const multer = require("multer");
const Property = require("../Models/Propertymodel");

// Define the storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination where the files should be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename as unique
  },
});

// Create the multer instance with storage and constraints
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("user_id")
      .populate("tenant_id")
      .populate("landlord_id");

    res.status(200).json({ properties });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a property
const createProperty = async (req, res) => {
  //console.log("Request Body:", req.body);
  //console.log("Files:", req.files);

  try {
    const userID = req?.user?._id;
    const {
      property_name,
      property_address,
      tenant_id,
      landlord_id,
      status,
      price,
      amenities,
      floor,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    const property_images = req.files.map((file) => file.filename);

    console.log("Property images:", property_images);

    const property = await Property.create({
      user_id: userID,
      property_name: property_name,
      property_address: property_address,
      property_images: property_images,
      tenant_id: tenant_id,
      landlord_id: landlord_id,
      status: status,
      price: price,
      amenities: amenities,
      floor: floor,
    });

    res.status(201).json({ property });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a property
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the property by ID and delete it
    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    res.status(200).json({ message: "Property deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a property
const updateProperty = async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Files:", req.files);

  try {
    const { id } = req.params;
    const {
      property_name,
      property_address,
      tenant_id,
      landlord_id,
      status,
      price,
      amenities,
      floor,
    } = req.body;

    // Check if files were uploaded
    let property_images = [];
    if (req.files && req.files.length > 0) {
      property_images = req.files.map((file) => file.filename);
    }

    // Find the property by ID and update it
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        property_name: property_name,
        property_address: property_address,
        tenant_id: tenant_id,
        landlord_id: landlord_id,
        ...(property_images.length > 0 && { property_images: property_images }),
        status: status,
        price: price,
        amenities: amenities,
        floor: floor,
      },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found." });
    }

    res.status(200).json({ property: updatedProperty });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single property by ID
const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the property by ID
    const property = await Property.findById(id)
      .populate("user_id")
      .populate("tenant_id")
      .populate("landlord_id");

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    res.status(200).json({ property });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllListings = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("user_id")
      .populate("tenant_id")
      .populate("landlord_id");

    // const propertiesWithImageUrls = properties.map((property) => ({
    //   ...property.toObject(),
    //   property_images: property.property_images.map(
    //     (image) => `http://localhost:7000/uploads/${image}`
    //   ),
    // }));

    res.status(200).json({ properties });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getImges = async(req, res) => {
    const properties = await Property.find();

    // const propertiesWithImageUrls = properties.map((property) => ({
    //   ...property.toObject(),
    //   property_images: property.property_images.map(
    //     (image) => `http://localhost:7000/uploads/${image}`
    //   ),
    // }));
    // res.status(200).json({ properties: propertiesWithImageUrls });
}

const getSinglePropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the property by ID
    const property = await Property.findById(id)
      .populate("user_id")
      .populate("tenant_id")
      .populate("landlord_id");

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    res.status(200).json({ property });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Export the functions and multer middleware
module.exports = {
  upload,
  getAllProperties,
  createProperty,
  deleteProperty,
  updateProperty,
  getPropertyById,
  getAllListings,
  getSinglePropertyById,
//   getImges
};
