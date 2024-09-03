import React, { useEffect,useContext } from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { isLogin } from '../../auth';
import AuthContext from '../providers/AuthProvider';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "./../Navbar";

function Authlayout() {
  const { user } = useContext(AuthContext);
  return (
    <>
    {
        isLogin()
          ?
                    
          <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Navbar /> {/* Only one instance */}
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
          :
          <Navigate to="/login" />
    }
      </>
  )
}

export default Authlayout;
