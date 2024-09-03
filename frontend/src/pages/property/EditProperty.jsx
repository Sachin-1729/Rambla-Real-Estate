
import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  IconButton,
  OutlinedInput,
  Checkbox,
  ListItemText,
  List,
  ListItem,
  ListItemIcon
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Copyright from "../../components/Copyright";
import Count from "../../context/Count";

const CustomBox = styled(Box)({
  padding: 10,
});

const CustomBox_For_Form = styled(Box)({
  paddingTop: 50,
  paddingBottom: 50,
  paddingLeft: 100,
  paddingRight: 100,
});

const getToken = () => {
  // Retrieve the token from localStorage or context
  return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
};

function EditProperties() {
  const [propertyName, setPropertyName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [selectedTenant, setSelectedTenant] = useState(""); // Default to empty string
  const [selectedLandlord, setSelectedLandlord] = useState(""); // Default to empty string
  const [propertyImages, setPropertyImages] = useState([]);
  const [price, setPrice] = useState(""); // Added state for price
  const [floor, setFloor] = useState(""); // Added state for floor
  const [status, setStatus] = useState(""); // Initialize as string
  const [amenities, setAmenities] = useState([]); // Initialize as array
  const [allTenants, setAllTenants] = useState([]);
  const [allLandlords, setAllLandlords] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const amentiesOptions = [
    "Balcony",
    "Central heating",
    "Playground",
    "Dishwasher",
    "Dispensary",
    "Private parking",
    "Drying Machine",
    "Electric blinds",
    "Equipped kitchen",
    "Furniture",
    "Gym",
    "Pool",
    "Terrace",
    "Embedded closet",
    "Elevator",
    "Washing machine",
    "Closet",
    "Swimming pool",
    "Heating",
    "Washing Machine",
    "Parking",
    "Dish Washer",
    "Electric blinds",
  ];

  const { id } = useParams(); // Extract id from URL params
  const navigate = useNavigate();

  const handleGetProperties = async (id) => {
    try {
      const token = getToken();
      const response = await fetch(
        `http://localhost:7000/properties/store/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch property");
      }

      const propertyData = await response.json();

      setPropertyName(propertyData.property.property_name);
      setPropertyAddress(propertyData.property.property_address);
      setSelectedLandlord(propertyData.property.landlord_id._id);
      setSelectedTenant(propertyData.property.tenant_id._id);
      setAmenities(propertyData.property.amenities || []);
      setStatus(propertyData.property.status); // Use string if not multiple
      setPrice(propertyData.property.price); // Set price from fetched data
      setFloor(propertyData.property.floor); // Set floor from fetched data
    } catch (error) {
      console.error("Error fetching property:", error.message);
      toast.error("Error fetching property: " + error.message);
    }
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleAmenitiesChange = (event) => {
    const {
      target: { value },
    } = event;
    setAmenities(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  useEffect(() => {
    if (id) {
      handleGetProperties(id);
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();

      try {
        // Fetch all tenants and landlords
        const tenantsResponse = await fetch(
          "http://localhost:7000/users?role_id=66ab2e2ee525f1294827dbce",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const landlordsResponse = await fetch(
          "http://localhost:7000/users?role_id=66ab2e0be525f1294827dbcd",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!tenantsResponse.ok || !landlordsResponse.ok) {
          throw new Error("Failed to fetch tenants or landlords");
        }

        const tenantsData = await tenantsResponse.json();
        const landlordsData = await landlordsResponse.json();

        setAllTenants(tenantsData.users);
        setAllLandlords(landlordsData.users);

        setIsLoading(false); // Data fetching complete
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangeTenant = (event) => {
    setSelectedTenant(event.target.value);
  };

  const handleChangeLandlord = (event) => {
    setSelectedLandlord(event.target.value);
  };

  const handleFileSelect = (event) => {
    setPropertyImages(Array.from(event.target.files)); // Convert FileList to Array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedLandlord || !selectedTenant) {
      toast.error("Please select both landlord and tenant.");
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("property_name", propertyName);
    formData.append("property_address", propertyAddress);
    formData.append("landlord_id", selectedLandlord);
    formData.append("tenant_id", selectedTenant);
    formData.append("price", price); // Added price
    formData.append("floor", floor); // Added floor
    formData.append("status", status);

    amenities.forEach((amenity) => {
      formData.append("amenities", amenity); // Append amenities as separate items
    });

    propertyImages.forEach((file) => {
      formData.append("property_images", file); // Ensure file is appended correctly
    });

    try {
      const token = getToken();
      const response = await fetch(
        `http://localhost:7000/properties/store/${id}`,
        {
          method: "PATCH", // Use PATCH method to update
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Property updated successfully!");
        setTimeout(() => {
          navigate("/admin/fetchproperty");
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CustomBox>
          <Paper>
            <ToastContainer />
            <CustomBox_For_Form>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Property Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                />

                <TextField
                  label="Property Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                />

                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)} // Handle price
                />

                <TextField
                  label="Floor"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)} // Handle floor
                />

                                {/* File Upload Section */}
                                <Box
                  sx={{
                    maxWidth: 500,
                    mx: "auto",
                    mt: 4,
                    mb: 2,
                    p: 2,
                    border: "2px dashed #ccc",
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <input
                    id="upload-button"
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                  />
                  <label htmlFor="upload-button">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <CloudUploadIcon />
                    </IconButton>
                  </label>
                  <Typography variant="body2" color="textSecondary">
                    Drag and drop files here or click to select files
                  </Typography>
                  <List>
                    {propertyImages.map((file, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          {file.type.startsWith("image/") ? (
                            <ImageIcon />
                          ) : (
                            <InsertDriveFileIcon />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={file.name}
                          secondary={`${(file.size / 1024).toFixed(2)} KB`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <FormControl fullWidth margin="normal">
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    value={status}
                    onChange={handleChangeStatus}
                    input={<OutlinedInput label="Status" />}
                  >
                    <MenuItem value={"New"}>New</MenuItem>
                    <MenuItem value={"Sold"}>Sold</MenuItem>

                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <InputLabel id="amenities-label">Amenities</InputLabel>
                  <Select
                    labelId="amenities-label"
                    multiple
                    value={amenities}
                    onChange={handleAmenitiesChange}
                    input={<OutlinedInput label="Amenities" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {amentiesOptions.map((amenity, index) => (
                      <MenuItem key={index} value={amenity}>
                        <Checkbox checked={amenities.indexOf(amenity) > -1} />
                        <ListItemText primary={amenity} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <InputLabel id="tenant-label">Tenant</InputLabel>
                  <Select
                    labelId="tenant-label"
                    value={selectedTenant}
                    onChange={handleChangeTenant}
                  >
                    {allTenants.map((tenant) => (
                      <MenuItem key={tenant._id} value={tenant._id}>
                        {tenant.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <InputLabel id="landlord-label">Landlord</InputLabel>
                  <Select
                    labelId="landlord-label"
                    value={selectedLandlord}
                    onChange={handleChangeLandlord}
                  >
                    {allLandlords.map((landlord) => (
                      <MenuItem key={landlord._id} value={landlord._id}>
                        {landlord.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                >
                  Update Property
                </Button>
              </form>
            </CustomBox_For_Form>
          </Paper>
        </CustomBox>
      </Container>
      <Copyright sx={{ mt: 5 }} />
    </div>
  );
}

export default EditProperties;

