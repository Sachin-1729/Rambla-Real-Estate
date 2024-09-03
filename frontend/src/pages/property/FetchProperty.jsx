// import React, { useContext, useState, useEffect } from "react";
// import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Copyright from "../../components/Copyright";
// import { Button } from "@mui/material";
// import { Link } from "react-router-dom";
// import Count from "../../context/Count";
// import { ToastContainer } from "react-toastify";
// import { toast } from "react-toastify";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { IconButton } from "@mui/material";

// function FetchProperty() {
//   const [allProperty, setAllProperty] = useState([]);
//   const [id, setId] = useState("");
//   const [title, setTitle] = useContext(Count);

//   const defaultTheme = createTheme();

//   const getToken = () => {
//     // Retrieve the token from localStorage or context
//     return localStorage.getItem("authToken");
//   };

//   const fetchProperties = async () => {
//     try {
//       const token = getToken();
//       const response = await fetch("http://localhost:7000/properties/", {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include the token in the header
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch properties");
//       }

//       const data = await response.json();
//       console.log(data.properties);
//       setAllProperty(data?.properties || []); // Use correct data property
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//       toast.error("Error fetching properties: " + error.message);
//     }
//   };

//   useEffect(() => {
//     setTitle("Property Management");
//     fetchProperties(); // Call fetchProperties to get data
//   }, [setTitle]);

//   const handleDelete = async (property_id) => {
//     try {
//       const token = getToken();
//       const response = await fetch(
//         `http://localhost:7000/properties/store/${property_id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the header
//           },
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to delete property");
//       }

//       setAllProperty((prevProperties) =>
//         prevProperties.filter((property) => property._id !== property_id)
//       );
//       toast.success("Property deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting property:", error.message);
//       toast.error("Error deleting property: " + error.message);
//     }
//   };

//   return (
//     <div>
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Box
//           display="flex"
//           justifyContent="flex-end"
//           sx={{ paddingBottom: "20px" }} // MUI sx prop for Box
//         >
//           <IconButton
//             color="error"
//            // onClick={handleMultiDelete}
//             aria-label="delete"
//             sx={{ marginRight: "10px" }} // Add spacing between buttons
//           >
//             <DeleteIcon />
//           </IconButton>
//           <Link
//             to="/admin/createproperty"
//             style={{ textDecoration: "none" }} // Inline style for Link
//           >
//             <Button variant="contained" color="primary">
//               Create Property
//             </Button>
//           </Link>
//         </Box>
//         <TableContainer component={Paper}>
//           <ToastContainer />
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">Property Name</TableCell>
//                 <TableCell align="center">Property Address</TableCell>
//                 <TableCell align="center">Tenant</TableCell>
//                 <TableCell align="center">Landlord</TableCell>
//                 <TableCell align="center">Price</TableCell>
//                 <TableCell align="center">Status</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {allProperty.length > 0 ? (
//                 allProperty.map((row) => (
//                   <TableRow
//                     key={row._id}
//                     sx={{
//                       "&:last-child td, &:last-child th": { border: 0 },
//                     }}
//                   >
//                     <TableCell align="center" component="th" scope="row">
//                       {row?.property_name}
//                     </TableCell>
//                     <TableCell align="center">
//                       {row?.property_address}
//                     </TableCell>
//                     <TableCell align="center">{row?.tenant_id?.name}</TableCell>
//                     <TableCell align="center">
//                       {row?.landlord_id?.name}
//                     </TableCell>
//                     <TableCell align="center">{row?.price}</TableCell>
//                     <TableCell align="center">{row?.status}</TableCell>

//                     <TableCell align="center">
//                       <Box
//                         display="flex"
//                         justifyContent="space-between"
//                         alignItems="right"
//                         gap={2}
//                       >
//                         <Button
//                           onClick={() => handleDelete(row._id)}
//                           variant="contained"
//                           color="primary"
//                         >
//                           <DeleteIcon />
//                         </Button>

//                         <Link
//                           to={`/admin/properties/edit/${row._id}`}
//                           style={{ textDecoration: "none" }}
//                         >
//                           <Button variant="contained" color="primary">
//                             <EditIcon />
//                           </Button>
//                         </Link>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No data found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Copyright />
//       </Container>
//     </div>
//   );
// }

// export default FetchProperty;



import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import Count from "../../context/Count";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";

import Copyright from "../../components/Copyright";

function FetchProperty() {
  const [allProperty, setAllProperty] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [title, setTitle] = useContext(Count);

  const getToken = () => {
    // Retrieve the token from localStorage or context
    return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  };

  const fetchProperties = async () => {
    try {
      const token = getToken();
      const response = await fetch("http://localhost:7000/properties/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();
      setAllProperty(data?.properties || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Error fetching properties: " + error.message);
    }
  };

  useEffect(() => {
    setTitle("Property Management");
    fetchProperties();
  }, [setTitle]);

 console.log(allProperty,"All Properties")

  const handleDelete = async (property_id) => {
    try {
      const token = getToken();
      const response = await fetch(
        `http://localhost:7000/properties/store/${property_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete property");
      }

      setAllProperty((prevProperties) =>
        prevProperties.filter((property) => property._id !== property_id)
      );
      toast.success("Property deleted successfully!");
    } catch (error) {
      console.error("Error deleting property:", error.message);
      toast.error("Error deleting property: " + error.message);
    }
  };
  const handleSelectionChange = (newSelectionModel) => {
    console.log("Selection Model Changed:", newSelectionModel);
    setSelectedProperties(newSelectionModel);
  };

  const handleMultiDelete = async () => {
    try {
      const token = getToken();
      for (let property_id of selectedProperties) {
        await fetch(`http://localhost:7000/properties/store/${property_id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setAllProperty((prevProperties) =>
        prevProperties.filter(
          (property) => !selectedProperties.includes(property._id)
        )
      );
      toast.success("Selected properties deleted successfully!");
      setSelectedProperties([]);
    } catch (error) {
      console.error("Error deleting properties:", error.message);
      toast.error("Error deleting properties: " + error.message);
    }
  };

  const columns = [
    { field: "property_name", headerName: "Property Name", width: 150 },
    { field: "property_address", headerName: "Property Address", width: 200 },
    {
      field: "tenant_id.name",
      headerName: "Tenant",
      width: 130,
      renderCell: (params) => params.row?.tenant_id.name || "N/A", // Handle cases where tenant_id might be undefined
    },
    {
      field: "landlord_id.name",
      headerName: "Landlord",
      width: 130,
      renderCell: (params) => params.row?.landlord_id.name || "N/A", // Handle cases where landlord_id might be undefined
    },
    { field: "price", headerName: "Price", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
        >
          <Button
            onClick={() => handleDelete(params.row._id)}
            variant="contained"
            color="primary"
          >
            <DeleteIcon />
          </Button>
          <Link
            to={`/admin/properties/edit/${params.row._id}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="primary">
              Edit
            </Button>
          </Link>
        </Box>
      ),
    },
  ];

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Link to="/admin/createproperty" style={{ textDecoration: "none" }}>
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ paddingBottom: "20px" }}
          >
            <Button variant="contained" color="primary">
              Create Property
            </Button>
          </Box>
        </Link>
        <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
            rows={allProperty}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            checkboxSelection
            // onSelectionModelChange={handleSelectionChange}
            // getRowId={(row) => {row._id}} // Ensure _id is used as the unique identifier
            // getRowId={(row) => {
            //   //console.log("Row data:", row._id); // Log the row data
            //  // return row._id; // Ensure _id is used
            // }}
            onRowSelectionModelChange={(newSelectionModel) => handleSelectionChange(newSelectionModel)}
            getRowId={(row) => row._id}
          />
        </Box>
        {selectedProperties.length > 0 && (
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ paddingTop: "20px" }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleMultiDelete}
            >
              Delete Selected
            </Button>
          </Box>
        )}
        <ToastContainer />
        <Copyright />
      </Container>
    </div>
  );
}

export default FetchProperty;


// import React, { useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { Box, Button } from '@mui/material';

// const TestDataGrid = () => {
//   const [selectedProperties, setSelectedProperties] = useState([]);
  
//   const rows = [
//     { _id: 1, property_name: 'Property 1', property_address: 'Address 1' },
//     { _id: 2, property_name: 'Property 2', property_address: 'Address 2' },
//   ];
  
//   const columns = [
//     { field: 'property_name', headerName: 'Property Name', width: 150 },
//     { field: 'property_address', headerName: 'Property Address', width: 200 },
//   ];

//   const handleSelectionChange = (newSelectionModel) => {
//     console.log("nlfrn")
//     console.log("Selection Model Changed:", newSelectionModel);
//     setSelectedProperties(newSelectionModel);
//   };

//   return (
//     <Box sx={{ height: 400, width: '100%' }}>
//      <DataGrid
//   rows={rows}
//   columns={columns}
//   checkboxSelection
//   onRowSelectionModelChange={(newSelectionModel) => handleSelectionChange(newSelectionModel)}
//   getRowId={(row) => row._id}
// />

//       {selectedProperties.length > 0 && (
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={() => console.log('Deleting selected:', selectedProperties)}
//         >
//           Delete Selected
//         </Button>
//       )}
//     </Box>
//   );
// };

// export default TestDataGrid;
