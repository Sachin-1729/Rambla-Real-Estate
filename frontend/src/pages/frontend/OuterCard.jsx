import React from "react";
import PropertyDetails from "./Details";
import Box from "@mui/material/Box";

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Ensures full viewport height
        backgroundColor: '#f5f5f5', // Optional: background color for the page
        paddingLeft: 50, // Optional: padding around the container
        boxSizing: 'border-box' // Ensures padding is included in the total width and height
      }}
    >
      <PropertyDetails />
    </Box>
  );
}

export default App;
