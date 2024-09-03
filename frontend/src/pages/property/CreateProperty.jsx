

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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  OutlinedInput,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useNavigate } from "react-router-dom";
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
function CreateProperties() {
  const [propertyName, setPropertyName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [selectedTenant, setSelectedTenant] = useState("");
  const [selectedLandlord, setSelectedLandlord] = useState("");
  const [propertyImages, setPropertyImages] = useState([]);
  const [title, setTitle] = useContext(Count);
  const navigate = useNavigate();
  const [allTenants, setAllTenants] = useState([]);
  const [allLandlords, setAllLandlords] = useState([]);
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [amenities, Setamenities] = useState([]);
  const [floor, setFloor] = useState("");
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
    "Electric blids",
  ];

  useEffect(() => {
    setTitle("Create Property");

    const pageData = async () => {
      const token = getToken();

      try {
        const apiUrl1 =
          "http://localhost:7000/users?role_id=66ab2e2ee525f1294827dbce";
        const apiUrl2 =
          "http://localhost:7000/users?role_id=66ab2e0be525f1294827dbcd";

        const [response1, response2] = await Promise.all([
          fetch(apiUrl1, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(apiUrl2, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (!response1.ok || !response2.ok) {
          throw new Error("One or both of the network responses were not ok");
        }

        const data1 = await response1.json();
        const data2 = await response2.json();
        console.log(data1.users);
        setAllTenants(data1.users);
        setAllLandlords(data2.users);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    pageData();
  }, [setTitle]);

  const handleChangeTenant = (event) => {
    setSelectedTenant(event.target.value);
  };

  const handleChangeLandlord = (event) => {
    setSelectedLandlord(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
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
    formData.append("status", status);
    formData.append("price", price);
   // formData.append("amenties", amenties.join(", "));
    formData.append("floor", floor);
    amenities.forEach((amenity) => {
      formData.append("amenities[]", amenity);
    });

    propertyImages.forEach((file) => {
      formData.append("property_images", file); // Ensure file is appended correctly
    });

    // Debugging: Log FormData entries
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: ${value.name}`); // Log file name
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    try {
      const token = getToken();
      
      const response = await fetch("http://localhost:7000/properties/store", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Property created successfully!");
        setPropertyName("");
        setPropertyAddress("");
        setSelectedLandlord("");
        setSelectedTenant("");
        setPropertyImages([]);
        setStatus("");
        setPrice("");
        Setamenities([]);
        setFloor("");
        setTimeout(() => {
          navigate("/admin/fetchproperty");
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  const handleAmentiesChange = (event) => {
    Setamenities(event.target.value);
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

                {/* Status Field */}
                <FormControl fullWidth margin="normal">
                  <InputLabel id="status-dropdown-label">Status</InputLabel>
                  <Select
                    labelId="status-dropdown-label"
                    id="status-dropdown"
                    value={status}
                    label="Status"
                    onChange={handleChangeStatus}
                  >
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Sold">Sold</MenuItem>
                  </Select>
                </FormControl>

                {/* Price Field */}
                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                {/* Amenties Field */}
                <FormControl fullWidth margin="normal">
                  <InputLabel id="amenties-dropdown-label">Amenties</InputLabel>
                  <Select
                    labelId="amenties-dropdown-label"
                    id="amenties-dropdown"
                    multiple
                    value={amenities}
                    onChange={handleAmentiesChange}
                    input={<OutlinedInput label="Amenties" />}
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

                {/* Floor Field */}
                <TextField
                  label="Floor"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
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

                {/* Tenant Field */}
                <FormControl fullWidth margin="normal">
                  <InputLabel id="tenant-dropdown-label">Tenant</InputLabel>
                  <Select
                    labelId="tenant-dropdown-label"
                    id="tenant-dropdown"
                    value={selectedTenant}
                    label="Tenant"
                    onChange={handleChangeTenant}
                  >
                    {allTenants.map((tenant) => (
                      <MenuItem key={tenant._id} value={tenant._id}>
                        {tenant.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Landlord Field */}
                <FormControl fullWidth margin="normal">
                  <InputLabel id="landlord-dropdown-label">Landlord</InputLabel>
                  <Select
                    labelId="landlord-dropdown-label"
                    id="landlord-dropdown"
                    value={selectedLandlord}
                    label="Landlord"
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
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  Create Property
                </Button>
              </form>
            </CustomBox_For_Form>
          </Paper>
        </CustomBox>
        <Copyright />
      </Container>
    </div>
  );
}

export default CreateProperties;
