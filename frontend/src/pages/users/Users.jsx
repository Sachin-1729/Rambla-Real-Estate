import React, { useContext, useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
// import Orders from "./../components/Orders";
import Navbar from "../../components/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Copyright from "../../components/Copyright";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link, useResolvedPath } from "react-router-dom";
import Count from "../../context/Count";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the delete icon
import { IconButton } from "@mui/material";
import { Checkbox } from "@mui/material";

function Users() {
  const [alluser, setAlluser] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useContext(Count);

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const defaultTheme = createTheme();

  const getToken = () => {
    // Retrieve the token from localStorage or context
    return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  };

  const user = async () => {
    try {
      const token = getToken();
      const response = await fetch("http://localhost:7000/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setAlluser(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users: " + error.message);
    }
  };

  useEffect(() => {
    setTitle("User Management");
    user();
  }, [setTitle]);

  const handleDelete = async (user_id) => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:7000/users/${user_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }

      setAlluser((prevUsers) =>
        prevUsers.filter((user) => user._id !== user_id)
      );
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error.message);
      toast.error("Error deleting user: " + error.message);
    }
  };
  const handleMultiDelete = async () => {
    try {
      const token = getToken();
      const response = await fetch("http://localhost:7000/users/multi-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete users");
      }

      setAlluser((prevUsers) =>
        prevUsers.filter((user) => !selectedIds.includes(user._id))
      );
      setSelectedIds([]);
      toast.success("Users deleted successfully!");
    } catch (error) {
      console.error("Error deleting users:", error.message);
      toast.error("Error deleting users: " + error.message);
    }
  };
  const handleCheckboxChange = (id) => {
    console.log("Checkbox clicked for ID:", id);
    console.log("Current selected IDs:", selectedIds);
  
    if (selectedIds.includes(id)) {
      // ID already selected, so remove it
      const updatedIds = selectedIds.filter((item) => item !== id);
      console.log("Removing ID:", id);
      console.log("Updated selected IDs:", updatedIds);
      setSelectedIds(updatedIds);
    } else {
      // ID not selected, so add it
      const updatedIds = [...selectedIds, id];
      console.log("Adding ID:", id);
      console.log("Updated selected IDs:", updatedIds);
      setSelectedIds(updatedIds);
    }
  };
  

  const handleSelectAll = () => {
    console.log("Select All clicked");
    console.log("Current selectAll state:", selectAll);
  
    if (selectAll) {
      // Deselect all
      console.log("Deselecting all IDs");
      setSelectedIds([]);
    } else {
      // Select all
      const allIds = alluser.map((user) => user._id);
      console.log("Selecting all IDs:", allIds);
      setSelectedIds(allIds);
    }
    // Toggle the selectAll state
    setSelectAll(!selectAll);
  };
  
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          display="flex"
          justifyContent="flex-end"
          sx={{ paddingBottom: "20px" }} // MUI sx prop for Box
        >
          <IconButton
            color="error"
            onClick={handleMultiDelete}
            aria-label="delete"
            sx={{ marginRight: "10px" }} // Add spacing between buttons
          >
            <DeleteIcon />
          </IconButton>
          <Link
            to="/admin/createuser"
            style={{ textDecoration: "none" }} // Inline style for Link
          >
            <Button variant="contained" color="primary">
              Create User
            </Button>
          </Link>
        </Box>
        <TableContainer component={Paper}>
          <ToastContainer />
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
                </TableCell>

                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Delete User</TableCell>
                <TableCell align="right">Edit User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alluser.length > 0 ? (
                alluser.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(row._id)}
                        onChange={() => handleCheckboxChange(row._id)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.name}
                    </TableCell>
                    <TableCell align="right">{row?.email}</TableCell>
                    {/* <TableCell align="right">{row.password}</TableCell> */}

                    <TableCell align="right">{row?.role_id?.name}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => handleDelete(row._id)}
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Delete
                      </Button>
                    </TableCell>

                    <TableCell align="right">
                      <Link
                        to={`/admin/users/edit/${row._id}`} // Use the correct path with dynamic ID
                        style={{ textDecoration: "none" }}
                      >
                        <Box display="flex" justifyContent="flex-end">
                          <Button variant="contained" color="primary">
                            Edit
                          </Button>
                        </Box>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Copyright />
      </Container>
    </div>
  );
}

export default Users;
