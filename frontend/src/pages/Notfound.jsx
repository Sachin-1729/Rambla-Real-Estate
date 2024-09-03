import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Notfound() {
  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" component="h1" color="textPrimary" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="h2" color="textSecondary" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Sorry, the page you are looking for does not exist.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}

export default Notfound;
