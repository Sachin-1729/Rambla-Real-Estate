import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SliderComp from "./SliderComp";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';

export default function PropertyDetails() {
  const { id } = useParams(); // Get the id from the URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  useEffect(() => {
    async function fetchPropertyDetails() {
      try {
        const response = await fetch(
          `http://localhost:7000/properties/listing/${id}`
        );
        const data = await response.json();
        console.log(data);
        setProperty(data.property);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching property details:", error);
        setLoading(false);
      }
    }

    fetchPropertyDetails();
  }, [id],navigate);
  console.log(property);
  if (loading) {
    return <CircularProgress />;
  }

  if (!property) {
    return <Typography variant="h5">Property not found</Typography>;
  }

  return (
    <>
    
    <Typography align="left" variant="body1" sx={{ marginTop: 2 }}>
    <IconButton
      color="primary"
      onClick={handleClick}
    >
      <HomeIcon />
    </IconButton>
      </Typography>
    
      <Typography variant="h4" gutterBottom>
        {property.property_name}
      </Typography>
      <SliderComp images={property.property_images} />
      <br />
      <br />

      <Typography align="left" variant="body1" sx={{ marginTop: 2 }}>
        Location: {property.property_address}
      </Typography>
      <Typography align="left" variant="body1" sx={{ marginTop: 1 }}>
        Status: {property.status}
      </Typography>
      <Typography align="left" variant="body1" sx={{ marginTop: 1 }}>
        Price: {property.price}$
      </Typography>
      <Typography align="left" variant="body1" sx={{ marginTop: 1 }}>
        Floor: {property.floor}
      </Typography>
      <Typography align="left" variant="body1" sx={{ marginTop: 1 }}>
        Landlord: {property.landlord_id?.name}
      </Typography>
      <Typography align="left" variant="body1" sx={{ marginTop: 1 }}>
        Tenant: {property.tenant_id?.name}
      </Typography>

      <Typography align="left" variant="body1" sx={{ marginTop: 1 }}>
        Amenity:
      </Typography>
      {property?.amenities?.map((item, index) => (
        <Typography key={index} variant="body1" sx={{ marginTop: 1 }}>
          {item}
        </Typography>
      ))}
    </>
  );
}
