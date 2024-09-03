import React, { useState, useContext , useEffect } from "react";
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
import { Link as Links } from "react-router-dom"; 
import CryptoJS from 'crypto-js';
import '../pages/login.css'



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
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me" checkbox
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  // const [trail, setTrail] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const SECRET_KEY = 'your_secret_key';

  function encryptText(text)
  {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  }
  
  const handleMouseMove = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  // React.useEffect(() => {
  //   const trailEffect = () => {
  //     setTrail((prevTrail) => ({
  //       x: prevTrail.x + (position.x - prevTrail.x) * 1.3,
  //       y: prevTrail.y + (position.y - prevTrail.y) * 1.3,
  //     }));
  //   };
  //   const intervalId = setInterval(trailEffect, 16);

  //   return () => clearInterval(intervalId);
  // }, [position]);

  function decryptText(encryptedtext)
  {
    const bytes = CryptoJS.AES.decrypt(encryptedtext, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);

  }


  // Check storage and set form values on mount
  useEffect(() => {
    // const savedEmail = localStorage.getItem('savedEmail') || sessionStorage.getItem('savedEmail');
    // const savedPassword = localStorage.getItem('savedPassword') || sessionStorage.getItem('savedPassword');
    // const token = localStorage.getItem('authToken');

    // if (token) {
   
    //   setRememberMe(!!savedEmail); // Set rememberMe based on the presence of savedEmail
    // }
    if(localStorage.length !== 0)
    {  
      const decryptedEmail = decryptText(localStorage.savedEmail);
      const decryptedPassword = decryptText(localStorage.savedPassword)
      setEmail(decryptedEmail || "");
      setPassword(decryptedPassword || "");
      setRememberMe(true)

    }
    console.log(localStorage)
 
    
  }, []);



 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state
    setError(null); // Clear any previous error

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      const response = await fetch("http://localhost:7000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const result = await response.json();
      // Call the login function from AuthContext
      // login({
      //   token: result.token, 
      //   user: result.user,
      //   rememberMe, // Pass the state of "Remember Me"
      // });
      login(result.token, result.user,  rememberMe); // Pass rememberMe as a separate argument


        // Save email and password to storage if rememberMe is true
        if (rememberMe) {
          const encryptedMail = encryptText(email);
          const encryptedPassword = encryptText(password);
          localStorage.setItem('savedEmail', encryptedMail);
          localStorage.setItem('savedPassword', encryptedPassword);
        
        } else {
          const encryptedMail = encryptText(email);
          const encryptedPassword = encryptText(password);
          sessionStorage.setItem('savedEmail', encryptedMail);
          sessionStorage.setItem('savedPassword', encryptedPassword);
        }

      navigate("/admin"); // Redirect to a protected route
    } catch (err) {
      setError(err.message || "There was an error logging in!"); // Update error state
      console.error(err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  console.log("Remember Me Checkbox" , rememberMe);

  return (
   <>
   
  
    {/* <div className="App" onMouseMove={handleMouseMove}>
      <div className="circle" style={{ left: trail.x, top: trail.y }}></div> */}
    

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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email} // Set value to email state
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password} // Set value to password state
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
       <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                checked={rememberMe} // Controlled by rememberMe state
                onChange={(e) => setRememberMe(e.target.checked)} // Updates rememberMe state
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Sign In
          </Button>
          {error && <Typography color="error">{error}</Typography>}
          <Grid container>
            <Grid item xs>
              <Links to="/forgotpassword" variant="body2">
                Forgot password?
              </Links>
            </Grid>
            <Grid item>
              {/* <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
    {/* </div> */}
    </>
  );
}
