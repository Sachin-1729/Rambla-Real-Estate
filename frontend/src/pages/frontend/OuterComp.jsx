import React from 'react';
import InnerComp from './InnerComp';
import Navbar from './Navbar';
import { Box } from '@mui/material';

function OuterComp() {
  return (
<>
<Navbar />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Ensures the content is centered vertically
        px: 10, // Padding
        m: 2, // Margin
      }}
    >
      <InnerComp />
    </Box>

</>
   
  );
}

export default OuterComp;
