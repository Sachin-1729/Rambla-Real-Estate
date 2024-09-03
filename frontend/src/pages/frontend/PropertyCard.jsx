import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SliderComp from "./SliderComp";
import { Link } from "react-router-dom";

export default function MediaCard({
  id,
  images = [],
  location,
  status,
  title,
  price,
}) {
  console.log(Array.isArray(images), images, "mai Hu card ka array image");

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        maxWidth: 1000,
        borderRadius: 0,
      }}
    >
      <Box
        sx={{ width: 300, height: 200, display: "flex", alignItems: "center" }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          {/* <SliderComp images={Array.isArray(images) ? images : []} /> */}
          <SliderComp images={images} />
        </div>
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", padding: 2, flex: 1 }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography gutterBottom variant="h5" component="div">
            <Link
              to={`/details/${id}`}
              style={{ textDecoration: "none" }}
            >
              {" "}
              {title}
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* ID: {id} */}
            {/* <br /> */}
            Location: {location}
            <br />
            Status: {status}
            <br />
            Price: {price}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
