import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Deposits from "./../components/Deposites";
import Copyright from "../components/Copyright";
import Count from "../context/Count";
import { useContext, useState, useEffect } from "react";

export default function Dashboard() {
  const [title, setTitle] = useContext(Count);
  const[totalLandlord , setTotalLandlord] = useState([]);
  const[totalPropertis , setTotalProperties] = useState([]);
  const[totalTenants , setTotalTenants] = useState([]);

  const getToken = () => {
    // Retrieve the token from localStorage or context
    return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  };
 

  async function totaltenants()
  {
    const token = getToken();
    const apiUrl = "http://localhost:7000/users?role_id=66ab2e2ee525f1294827dbce";
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if(!response.ok)
    {
      throw new Error("Tenant Response is not  ok");

    }
    const data = await response.json();
    setTotalTenants(data?.users.length);
   

  }
  async function totallandlord()
  {
    const token = getToken();
    const apiUrl = "http://localhost:7000/users?role_id=66ab2e0be525f1294827dbcd";
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if(!response.ok)
    {
      throw new Error("Tenant Response is not  ok");

    }
    const data = await response.json();
    setTotalLandlord(data?.users.length);
   

  }
  async function totalproperties()
  {
       const api = "http://localhost:7000/properties/listing/";
       const response = await fetch(api);
       if(!response.ok)
       {
        throw new Error("Properties ki api me kahi luch galat hai")
       }
       const data = await response.json();
       setTotalProperties(data.properties.length)
  }

  useEffect(() => {
    setTitle("Dashboard");
    totaltenants();
    totallandlord();
    totalproperties();
  }, [setTotalTenants,setTotalLandlord,setTitle, setTotalProperties]);

  

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={4} lg={4}>
            {/* <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper> */}
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Deposits
                title="Total Properties"
                amount={totalPropertis}
                
              />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Deposits
                 title="Total Landlord"
                 amount={totalLandlord}
                />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Deposits 
                 title="Total Tenants"
                 amount={totalTenants}
                 />
            </Paper>
          </Grid>
        </Grid>
        <Copyright />
      </Container>
    </>
  );
}
