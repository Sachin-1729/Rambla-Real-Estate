import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" sx={{ boxShadow: 1 , mt: 0, mb: 7}}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and Branding */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <HomeIcon fontSize="large" />
          </IconButton>
          <Box sx={{ ml: 1 }}>
            <Typography variant="h6" noWrap component="div">
              Rambla
            </Typography>
            <Typography variant="body2" color="text.secondary">
              we give you the key
            </Typography>
          </Box>
        </Box>

        {/* Links */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button color="inherit">CALCULATOR</Button>
          <Button color="inherit">MANAGEMENT</Button>
          <Button color="inherit">CRM</Button>
        </Box>

        {/* Right Side: Language Selector and Contact Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleLanguageClick}>
            <LanguageIcon />
            <Typography variant="body1" sx={{ ml: 1 }}>
              English
            </Typography>
            <ArrowDropDownIcon />
          </Box>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleLanguageClose}>
            <MenuItem onClick={handleLanguageClose}>English</MenuItem>
            <MenuItem onClick={handleLanguageClose}>Spanish</MenuItem>
          </Menu>
          <Button variant="contained" color="warning" sx={{ borderRadius: '20px', padding: '6px 16px' }}>
            Contact Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
