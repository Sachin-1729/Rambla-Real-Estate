import React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Orders() {
  const [alluser, setAlluser] = useState([]);

  async function user() {
    await fetch("http://localhost:7000/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAlluser(data.users);
      });
  }

  useEffect(() => {
    user();
    //console.log(alluser)
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Password</TableCell>
              <TableCell align="right">Role</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {alluser.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.password}</TableCell>
                <TableCell align="right">{row.role_id}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Orders;
