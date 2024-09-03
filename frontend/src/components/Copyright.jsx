import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright() {
  function CopyrightFunc(props) {
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
  return <CopyrightFunc sx={{ pt: 4 }} />;
}

export default Copyright;
