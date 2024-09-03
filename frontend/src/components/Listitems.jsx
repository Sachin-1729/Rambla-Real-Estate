import React, { useContext } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import LogoutIcon from '@mui/icons-material/Logout';

const MainListItems = () => {
  const { user, logout } = useContext(AuthProvider);

  const handleLogout = () => {
        logout();
  };
 
  return (
    <>
      <Link style={{ textDecoration: 'none' ,color: 'inherit' }} to="/admin/">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>

      <Link style={{ textDecoration: 'none', color: 'inherit'}} to="/admin/users">
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users Management" />
        </ListItemButton>
      </Link>

      
      <Link style={{ textDecoration: 'none', color: 'inherit'}} to="/admin/fetchproperty">
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Property Management" />
        </ListItemButton>
      </Link>

      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
        <LogoutIcon/>
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </>
  );
};

export { MainListItems };
