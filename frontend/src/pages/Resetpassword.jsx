import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate , useParams , useLocation } from "react-router-dom";
import AuthContext from "../components/providers/AuthProvider";
import { Link as Links } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {

  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();
  const [password , setPassword] = useState('');
  const[confirmpassword , setconfirmpassword] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token"); // Get the token from the query string
  

  
console.log(token, "token hu bro")
 function handleChangepassword(event)
 {
    setPassword(event.target.value);
    console.log(password, "Password")
 }

 function handleChangeConfirmpassword(event)
 {
    setconfirmpassword(event.target.value);
    console.log(confirmpassword, "confirmpassword")

 }
 

const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent default form submission
  setLoading(true); // Set loading state

  try {
    // You can access the password and confirm password here
    console.log("Password:", password);
    console.log("Confirm Password:", confirmpassword);

    // Check if passwords match before proceeding
    if (password !== confirmpassword) {
      throw new Error("Passwords do not match");
    }

    const response = await fetch(`http://localhost:7000/users/reset-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        password: password, // Send the password to the server
        confirmPassword: confirmpassword, // Send confirm password if needed
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Password reset failed");
    }
    if(response.ok)
    {  
        toast.success("Password updated successfully!");
        setTimeout(() => {
            navigate("/login"); 
          }, 2000);
       
        const result = await response.json();
        console.log(result);

    }



  } catch (err) {
    toast.error("Error reseting  password: " + err.message);
  } finally {
    setLoading(false); // Reset loading state
  }
};


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
    <Links to="/login">
    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <ArrowBackIcon/>
        </Avatar>
    </Links>
 
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset_Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Enter new password"
            name="password"
            autoComplete="password"
            autoFocus
            value={password} // Bind 'newPassword' state to the TextField
            onChange={handleChangepassword} // Handle change event
          /> 
        <TextField
            margin="normal"
            required
            fullWidth
            id="confirm-password"
            label="Confirm new password"
            name="password"
            autoComplete="password"
            autoFocus
            value={confirmpassword} // Bind 'newPassword' state to the TextField
            onChange={handleChangeConfirmpassword} // Handle change event
          /> 
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <ToastContainer />
    </Container>
  );
}

