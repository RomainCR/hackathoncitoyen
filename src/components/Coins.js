import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  avatar: {
    margin: 10,

    right : '0',
    top : '10'
    
  },
 
});

export default function ImgAvatar() {
  const classes = useStyles();

  return (
    <Grid container justify="flex-end" >
    <p>10 pts, add a random icon here</p>
     
    </Grid>
  );
}

