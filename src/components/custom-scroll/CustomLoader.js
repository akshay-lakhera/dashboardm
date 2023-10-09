import { CircularProgress, Grid } from "@mui/material";
import React from "react";

function CustomLoader({ show }) {
  return (
    <Grid container justifyContent="center" width="100%">
      <Grid item xs={12} textAlign="center" width="100%">
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

export default CustomLoader;
