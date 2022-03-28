import { React } from "react";
import { Box, CircularProgress } from "@material-ui/core";


const LoadingSpinner = ( props ) => {

  return(
    <Box p={3} style={{ width: "100%", textAlign: "center" }}>
      <CircularProgress />
    </Box>
  );

}

export default LoadingSpinner;