import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import MediaCard from "./DetailCard";

function Details() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 4, sm: 3, md: 3 }}>
          <Grid item xs={6}>
            <Item>
              <MediaCard />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Details;
