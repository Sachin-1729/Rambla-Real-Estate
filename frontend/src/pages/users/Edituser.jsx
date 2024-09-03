// import React, { useContext, useState, useEffect } from "react";
// import { styled, createTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import Paper from "@mui/material/Paper";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import { useNavigate, useParams } from "react-router-dom";
// import Count from "../../context/Count";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import TableContainer from "@mui/material/TableContainer";
// import Copyright from "../../components/Copyright";

// const defaultTheme = createTheme();


// const CustomBox = styled(Box)({
//   padding: 10,
// });

// const CustomBox_For_Form = styled(Box)({
//   paddingTop: 50,
//   paddingBottom: 50,
//   paddingLeft: 100,
//   paddingRight: 100,
// });

// function EditUsers() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [selectedValue, setSelectedValue] = useState("");
//   const navigate = useNavigate();
//   const [title, setTitle] = useContext(Count);
//   const { id } = useParams();

 

//   const getSingleUser = async () => {
   
    
//     try {
//       const response = await fetch(`http://localhost:7000/users/${id}`);
//       const result = await response.json();
//       if (response.ok) {
//        console.log(result)
//        setName(result.user.name)
//        setEmail(result.user.email)
//        setPassword(result.user.password)
//        setRole(result.user.role_id)
//        setSelectedValue(result.user.role_id)
//       } else {
//        toast.error(result.message || "Failed to fetch user.");
//       }
//     } catch (error) {
//       toast.error("Error fetching user: " + error.message);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!role) {
//       toast.error("Please select a role.");
//       return;
//     }

//     const updatedUser = { name, email, password, role_id: role };

//     try {
//       const response = await fetch(`http://localhost:7000/users/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedUser),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         toast.success("User updated successfully!");
//         setTimeout(() => {
           
//             navigate("/users");
//           }, 2000);
        
//       } else {
//        toast.error(result.message || "Failed to update user.");
//       }
//     } catch (error) {
//       toast.error("Error updating user: " + error.message);
//     }
//   };

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//     setRole(event.target.value);
//   };
//   useEffect(() => {
//     setTitle("Edit User");
//     getSingleUser();
//   }, [setTitle, id]);

//   return (
//     <div>
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <CustomBox>
//           <TableContainer component={Paper}>
//             <CustomBox_For_Form>
//               <form onSubmit={handleUpdate}>
//                 <TextField
//                   label="Name"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />

//                 <TextField
//                   label="Email"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />

//                 <TextField
//                   label="Password"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />

//                 <FormControl fullWidth margin="normal">
//                   <InputLabel id="dropdown-label">Select Role</InputLabel>
//                   <Select
//                     labelId="dropdown-label"
//                     id="dropdown"
//                     value={selectedValue}
//                     label="Select Role"
//                     onChange={handleChange}
//                   >
//                     <MenuItem value="66ab2dbbe525f1294827dbcc">Admin</MenuItem>
//                     <MenuItem value="66ab2e0be525f1294827dbcd">Landlord</MenuItem>
//                     <MenuItem value="66ab2e2ee525f1294827dbce">Tenants</MenuItem>
//                   </Select>
//                 </FormControl>

//                 <br />
//                 <br />

//                 <Button variant="contained" color="primary" type="submit">
//                   Edit User
//                 </Button>
//               </form>
//             </CustomBox_For_Form>
//           </TableContainer>
//         </CustomBox>

//         <ToastContainer />
//         <Copyright />
//       </Container>
//     </div>
//   );
// }

// export default EditUsers;

import React, { useContext, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import Count from "../../context/Count";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableContainer from "@mui/material/TableContainer";
import Copyright from "../../components/Copyright";

const CustomBox = styled(Box)({
  padding: 10,
});

const CustomBox_For_Form = styled(Box)({
  paddingTop: 50,
  paddingBottom: 50,
  paddingLeft: 100,
  paddingRight: 100,
});

function EditUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const navigate = useNavigate();
  const [title, setTitle] = useContext(Count);
  const { id } = useParams();
  const getToken = () => {
    // Retrieve the token from localStorage or context
    return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  };
  const getSingleUser = async () => {
    try {
      const token = getToken(); // Get the token from localStorage
      const response = await fetch(`http://localhost:7000/users/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}` // Include the token in the headers
        }
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result);
        setName(result.user.name);
        setEmail(result.user.email);
        setPassword(result.user.password);
        setRole(result.user.role_id);
        setSelectedValue(result.user.role_id);
      } else {
        toast.error(result.message || "Failed to fetch user.");
      }
    } catch (error) {
      toast.error("Error fetching user: " + error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!role) {
      toast.error("Please select a role.");
      return;
    }

    const updatedUser = { name, email, password, role_id: role };

    try {
      const token = getToken();// Get the token from localStorage
      const response = await fetch(`http://localhost:7000/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Include the token in the headers
        },
        body: JSON.stringify(updatedUser),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("User updated successfully!");
        setTimeout(() => {
          navigate("/admin/users");
        }, 2000);
      } else {
        toast.error(result.message || "Failed to update user.");
      }
    } catch (error) {
      toast.error("Error updating user: " + error.message);
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setRole(event.target.value);
  };

  useEffect(() => {
    setTitle("Edit User");
    getSingleUser();
  }, [setTitle, id]);

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CustomBox>
          <TableContainer component={Paper}>
            <CustomBox_For_Form>
              <form onSubmit={handleUpdate}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <FormControl fullWidth margin="normal">
                  <InputLabel id="dropdown-label">Select Role</InputLabel>
                  <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    value={selectedValue}
                    label="Select Role"
                    onChange={handleChange}
                  >
                    <MenuItem value="66ab2dbbe525f1294827dbcc">Admin</MenuItem>
                    <MenuItem value="66ab2e0be525f1294827dbcd">Landlord</MenuItem>
                    <MenuItem value="66ab2e2ee525f1294827dbce">Tenants</MenuItem>
                  </Select>
                </FormControl>

                <br />
                <br />

                <Button variant="contained" color="primary" type="submit">
                  Edit User
                </Button>
              </form>
            </CustomBox_For_Form>
          </TableContainer>
        </CustomBox>

        <ToastContainer />
        <Copyright />
      </Container>
    </div>
  );
}

export default EditUsers;
