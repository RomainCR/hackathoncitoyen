import React from "react";
import Grid from "@material-ui/core/Grid";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import TextField from "@material-ui/core/TextField";
const CompIcons = () => {
  return (
    <>
      <Grid container   direction="row"

  justify="flex-end" >
       
        <Grid item xs={6} style={{marginTop : '20px'}} />{" "}
        
        <TextField
            disabled
         
            rows="1"
            style={{
              border: "2px solid black",
            
              borderRadius: "10px",
           
            }}
          >
            blablausertextbio{" "}
          </TextField>{" "}
      </Grid>
    </>
  );
};

export default CompIcons;
