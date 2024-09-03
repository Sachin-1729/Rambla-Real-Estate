import React, { useState, useContext, useEffect } from "react";
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
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import AuthContext from "../components/providers/AuthProvider";
import { Link as Links } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';




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
  const { login } = useContext(AuthContext); // Use login from AuthContext
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();
  const[forgotPasswordIndicator , setforgotPasswordIndicator] = useState('');
  const SECRET_KEY = 'your_secret_key';
  const[emailaddress , setEmail] = useState('');

  function encryptText(text)
  {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  }

  function decryptText(encryptedtext)
  {
    const bytes = CryptoJS.AES.decrypt(encryptedtext, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);

  }


 

  useEffect(() => {
    if(localStorage.length !=0)
      {
    const dycryptedemail = decryptText(localStorage.savedEmail);
             setEmail(dycryptedemail);
      }
  }, []); // Dependency array to avoid infinite loop



  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state
    setError(null); // Clear any previous error

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
   
  

    try {
      const response = await fetch("http://localhost:7000/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:email }),
      });
 
    
      if(response.ok)
      { 
       toast.success("Reset link has been sent to your email");
       setEmail('');
       document.getElementById("form").reset();
      

      }

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData);
        throw new Error(errorData.message || "Login failed");
      }

      const result = await response.json();
      // Call the login function from AuthContext
      
      console.log(result);

    
    } catch (err) {
      setError(err.message || "There was an error logging in!"); // Update error state
      console.error(err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  function handlechangeEvent(event)
  {
    setEmail(event.target.value);
  }
 
 

  return (

    <>

    
   
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset_Password
            </Typography>
            <Box component="form" id="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={emailaddress}
                onChange={handlechangeEvent}
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
    
    
    </>

   

  
  );
}

